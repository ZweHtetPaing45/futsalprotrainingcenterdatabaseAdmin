const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const uploader = require('@zwehtetpaing55/uploader');




exports.addingWalkIn = async (court_name,daily_price,capacity,open_at,close_at)=>{

    const [court_id] = await com.pool.query('select id from court where court_name = ?',[court_name]);

    const c_id = court_id[0].id;

    const adding = await com.pool.query('insert into walk_ins (court_id,daily_price,capacity,open_at,close_at) values (?,?,?,?,?)',[c_id,daily_price,capacity,open_at,close_at]);

    if(!adding)throw new AppError("Can not create walk in",500);

    return true;

}

exports.walkInBooking = async (walk_in_id,payment_method,vanue_id,court_id,name,phone,date,items,file,department)=>{

    // console.log('items in repo',items);

    console.log('payment_method',payment_method);
    let image_url;
    let public_id;

    let bookingId;

    if(file){

        console.log('First');

        const result = await uploader.upload(file, 'walk_in_booking');

        image_url = result.image_url;
        public_id = result.public_id;

    let [id] = await com.pool.query('select id from payment where payment_method = ?',[payment_method]);

    // console.log('payment_id',id[0].id);

    const payment_id = id[0].id;

    const [booking] = await com.pool.query('insert into walk_in_bookings (walk_in_id,payment_id,vanue_id,court_id,name,phone,date,payment_image_url,payment_public_id) values(?,?,?,?,?,?,?,?,?)',[walk_in_id,payment_id,vanue_id,court_id,name,phone,date,image_url,public_id]);

    if(!booking)throw new AppError('Walk In Booking Error',400);

    bookingId = booking.insertId;

    // console.log('booking id',bookingId);
}else{

    console.log('Second');

    const [booking] = await com.pool.query('insert into walk_in_bookings(walk_in_id,vanue_id,court_id,name,phone,date) values(?,?,?,?,?,?)',[walk_in_id,vanue_id,court_id,name,phone,date]);

    if(!booking)throw new AppError('Admin Booking Error',400);

    bookingId = booking.insertId;

    // console.log('booking id',bookingId); 

}

const [walk_in_price] = await com.pool.query('select daily_price from walk_ins where id = ?',walk_in_id);

let walk_price = walk_in_price[0].daily_price;

// console.log("walk_price",walk_price);

await com.pool.query('update walk_in_bookings set amount = ? where id = ?',[walk_price,bookingId]);

if(items){

    const item = JSON.parse(items);

    // console.log('item',item);


       let total = 0;

        for(const eq of item){

            const [eq_price] = await com.pool.query('select rental_price,qty_total from equipment where id = ?',eq.equipment_id);

            const eqprice = eq_price[0].rental_price;

            const eq_id = eq.equipment_id;
            const quantity = eq.quantity;

            console.log('quantity',quantity);

            console.log("qty_total",eq_price[0].qty_total);

            if(eq_price[0].qty_total < Number(quantity)){
                return "Equipment is not available";
            }
            
                
            const remainQuantity = eq_price[0].qty_total - Number(quantity);

            console.log("RemainQuantity",remainQuantity);

            await com.pool.query('update equipment set qty_total = ? where id = ?',[remainQuantity,eq_id]);

            // admin_booking_total_price += eqprice;

            total = quantity * eqprice;

            console.log('total',total);

            walk_price += total;

            console.log("walk_price",walk_price);

            // total += admin_booking_total_price;

            const insert_eq = await com.pool.query('insert into walk_in_equipment(walk_in_booking_id,equipment_id,quantity,price,total,department) values(?,?,?,?,?,?)',[bookingId,eq_id,quantity,eqprice,total,department]);

            if(!insert_eq)throw new AppError('Walk In booking equipment Error',400);

    }

    console.log('Walk_In_booking_total_price ',walk_price);


    const [admin_booking_total_amount] = await com.pool.query('update walk_in_bookings set amount = ? where id = ?',[walk_price,bookingId]);

    if(!admin_booking_total_amount)throw new AppError('walk in booking total amount Error',400);

}

    const [rows] = await com.pool.query(`
        SELECT
    wi.id AS walk_in_id,
    wib.id AS booking_id,
    wib.name AS booking_name,
    wib.phone,
    wib.payment_image_url,
    DATE_FORMAT(wib.date, '%Y-%m-%d') AS date,
    DATE_FORMAT(wib.create_at, '%h:%i:%s %p') AS time,

    CONCAT(
        TIME_FORMAT(wi.open_at, '%h:%i %p'),
        ' - ',
        TIME_FORMAT(wi.close_at, '%h:%i %p')
    ) AS operating_hour,

    v.venue_name,
    c.court_name,
    p.payment_method,
    wi.daily_price AS walk_in_price,

    COALESCE(eq.equipment_price, 0) AS equipment_price,
    COALESCE(eq.equipment, JSON_ARRAY()) AS equipment,

    wib.amount

FROM walk_in_bookings AS wib

LEFT JOIN walk_ins AS wi
    ON wi.id = wib.walk_in_id

LEFT JOIN payment AS p
    ON p.id = wib.payment_id

LEFT JOIN venue AS v
    ON v.id = wib.vanue_id

LEFT JOIN court AS c
    ON c.id = wib.court_id

LEFT JOIN (
    SELECT
        wie.walk_in_booking_id,

        SUM(COALESCE(wie.total, 0)) AS equipment_price,

        JSON_ARRAYAGG(
            JSON_OBJECT(
                'equipment_id', e.id,
                'equipment_name', e.product_name,
                'quantity', wie.quantity,
                'price', wie.price,
                'total', wie.total
            )
        ) AS equipment

    FROM walk_in_equipment AS wie

    LEFT JOIN equipment AS e
        ON e.id = wie.equipment_id

    GROUP BY wie.walk_in_booking_id
) AS eq
    ON eq.walk_in_booking_id = wib.id

WHERE wib.id = ?

ORDER BY wib.id; 
        `,[bookingId]);

    const row = rows[0];

    return row;

}


exports.allWalkInBookingList = async ()=>{

    const [rows] = await com.pool.query(`
            SELECT
        wi.id As Walk_In_id,
        wib.id AS booking_id,
        wib.name AS booking_name,
        wib.phone,
        wib.date,
        wib.payment_image_url,

        CONCAT(
            TIME_FORMAT(wi.open_at, '%h:%i'),
            ' - ',
            TIME_FORMAT(wi.close_at, '%h:%i')
        ) AS time,

        v.venue_name,
        c.court_name,

        p.payment_method,

        wi.daily_price AS walk_in_price,

        COALESCE(SUM(wie.total), 0) AS equipment_price,

        wib.amount

    FROM walk_in_bookings wib

    LEFT JOIN walk_ins wi
        ON wi.id = wib.walk_in_id

    LEFT JOIN payment p
        ON p.id = wib.payment_id

    LEFT JOIN venue v
        ON v.id = wib.vanue_id

    LEFT JOIN court c
        ON c.id = wib.court_id

    LEFT JOIN walk_in_equipment wie
        ON wie.walk_in_booking_id = wib.id

    GROUP BY
        wib.id,
        wib.name,
        wib.phone,
        wib.date,
        wi.open_at,
        wi.close_at,
        v.venue_name,
        c.court_name,
        p.payment_method,
        wi.daily_price,
        wib.amount

    ORDER BY wib.id DESC;   
        `);

    return rows;
}

exports.mobileAllWalkInBookingList = async ()=>{

    const [rows] = await com.pool.query(`
            SELECT
        wi.id As Walk_In_id,
        wib.id AS booking_id,
        wib.name AS booking_name,
        wib.phone,
        wib.date,
        wib.payment_image_url,

        CONCAT(
            TIME_FORMAT(wi.open_at, '%h:%i'),
            ' - ',
            TIME_FORMAT(wi.close_at, '%h:%i')
        ) AS time,

        v.venue_name,
        c.court_name,

        p.payment_method,

        wi.daily_price AS walk_in_price,

        COALESCE(SUM(wie.total), 0) AS equipment_price,

        wib.amount

    FROM mobile_walk_in_bookings wib

    LEFT JOIN walk_ins wi
        ON wi.id = wib.walk_in_id

    LEFT JOIN payment p
        ON p.id = wib.payment_id

    LEFT JOIN venue v
        ON v.id = wib.vanue_id

    LEFT JOIN court c
        ON c.id = wib.court_id

    LEFT JOIN mobile_walk_in_equipment wie
        ON wie.mobile_walk_in_booking_id = wib.id

    GROUP BY
        wib.id,
        wib.name,
        wib.phone,
        wib.date,
        wi.open_at,
        wi.close_at,
        v.venue_name,
        c.court_name,
        p.payment_method,
        wi.daily_price,
        wib.amount

    ORDER BY wib.id DESC;   
        `);

    return rows;
}


exports.allCourtWalkIn = async ()=>{

    const [rows] = await com.pool.query(`
       SELECT
    v.id AS venue_id,
    v.venue_name,

    COALESCE(
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'equipment_id', e.id,
                    'equipment_name', e.product_name,
                    'rental_price', e.rental_price,
                    'qty_total', e.qty_total
                )
            )
            FROM equipment AS e
            WHERE e.venue_id = v.id
        ),
        JSON_ARRAY()
    ) AS equipment,

    JSON_ARRAYAGG(
        JSON_OBJECT(
            'court_id', c.id,
            'court_name', c.court_name,
            'walk_in_id', wi.id,

            'court_images',
            COALESCE(
                (
                    SELECT JSON_ARRAYAGG(cg.court_image_url)
                    FROM court_gallery AS cg
                    WHERE cg.court_id = c.id
                ),
                JSON_ARRAY()
            ),

            'walk_in_price',
            CASE
                WHEN c.court_active = 1 AND wi.id IS NOT NULL
                THEN wi.daily_price
                ELSE NULL
            END,

            'open_at',
            CASE
                WHEN c.court_active = 1 AND wi.id IS NOT NULL
                THEN TIME_FORMAT(wi.open_at, '%H:%i')
                ELSE NULL
            END,

            'close_at',
            CASE
                WHEN c.court_active = 1 AND wi.id IS NOT NULL
                THEN TIME_FORMAT(wi.close_at, '%H:%i')
                ELSE NULL
            END,

            'capacity',
            CASE
                WHEN c.court_active = 1 AND wi.id IS NOT NULL
                THEN wi.capacity
                ELSE NULL
            END,

            'booked_count',
            CASE
                WHEN c.court_active = 1 AND wi.id IS NOT NULL
                THEN COALESCE(b.booked_count, 0)
                ELSE NULL
            END,

            'remaining_capacity',
            CASE
                WHEN c.court_active = 1
                     AND wi.id IS NOT NULL
                     AND wi.capacity IS NOT NULL
                THEN GREATEST(
                    wi.capacity - COALESCE(b.booked_count, 0),
                    0
                )
                ELSE NULL
            END,

            'status',
            CASE
                WHEN c.id IS NULL THEN NULL
                WHEN c.court_active = 0 THEN NULL
                WHEN wi.id IS NULL OR wi.capacity IS NULL
                    THEN 'WALK_IN_NOT_AVAILABLE'
                WHEN COALESCE(b.booked_count, 0) >= wi.capacity
                    THEN 'FULLY_BOOKED'
                ELSE 'WALK_IN_ACTIVE'
            END
        )
    ) AS courts

FROM venue AS v

LEFT JOIN court AS c
    ON c.venue_id = v.id

LEFT JOIN walk_ins AS wi
    ON wi.court_id = c.id

LEFT JOIN (
    SELECT
        booking_rows.vanue_id,
        booking_rows.court_id,
        booking_rows.walk_in_id,
        COUNT(*) AS booked_count

    FROM (
        SELECT
            wib.vanue_id,
            wib.court_id,
            wib.walk_in_id
        FROM walk_in_bookings AS wib
        WHERE wib.date = CURDATE()

        UNION ALL

        SELECT
            mwib.vanue_id,
            mwib.court_id,
            mwib.walk_in_id
        FROM mobile_walk_in_bookings AS mwib
        WHERE mwib.date = CURDATE()
    ) AS booking_rows

    GROUP BY
        booking_rows.vanue_id,
        booking_rows.court_id,
        booking_rows.walk_in_id
) AS b
    ON b.vanue_id = v.id
   AND b.court_id = c.id
   AND b.walk_in_id = wi.id

GROUP BY
    v.id,
    v.venue_name,
    v.venue_image_url

ORDER BY v.id ASC;
        `);

        return rows;

}


exports.updateWalkIn = async (daily_price,capacity,open_at,close_at,walk_in_id)=>{

    let query = "UPDATE walk_ins SET ";
    let values = [];
 
    if (daily_price !== undefined){
        query += "daily_price = ?, ";
        values.push(daily_price);
    }


    if(capacity !== undefined){
        query += "capacity = ?, ";
        values.push(capacity);
    }

    if(open_at !== undefined){
        query += "open_at = ?, ";
        values.push(open_at);
    }

    if(close_at !== undefined){
        query += "close_at = ?, ";
        values.push(close_at);
    }

    if (values.length === 0) {
        return false;
    }

    query = query.slice(0, -2);

    query += " WHERE id = ?";
    values.push(walk_in_id);

    const [result] = await com.pool.query(query, values);

    if(!result)throw new AppError('Failed to update walk_ins',500);

    if(result.affectedRows === 0){
        throw new AppError('Failed to update walk_ins',404);
    };

  return true;
}