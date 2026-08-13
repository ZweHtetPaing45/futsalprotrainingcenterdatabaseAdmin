const com = require('../../../../config/com');
const AppError = require('../../../../utils/AppError');
const logger = require('../../../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');


exports.AdminBooking = async (venue_id,court_id,payment_method,reciept_no,date,court_time_slot_ids,department,items,file)=>{

    console.log('items in repo',items);

    let image_url;
    let public_id;

    let bookingId;

    console.log('court_time_slot_ids',court_time_slot_ids);
    console.log('typeof court_time_slot_ids',typeof court_time_slot_ids);

    if(file){

        console.log('First');

        const result = await uploader.upload(file, 'admin_booking');

        image_url = result.image_url;
        public_id = result.public_id;

    let [id] = await com.pool.query('select id from payment where payment_method = ?',[payment_method]);

    console.log('payment_id',id[0].id);

    const payment_id = id[0].id;

    const [booking] = await com.pool.query('insert into admin_booking (venue_id,court_id,payment_id,reciept_no,date,payment_image_url,payment_public_id) values(?,?,?,?,?,?,?)',[venue_id,court_id,payment_id,reciept_no,date,image_url,public_id]);

    if(!booking)throw new AppError('Admin Booking Error',400);

    bookingId = booking.insertId;

    console.log('booking id',bookingId);
}else{

    console.log('Second');

    const [booking] = await com.pool.query('insert into admin_booking (venue_id,court_id,reciept_no,date) values(?,?,?,?)',[venue_id,court_id,reciept_no,date]);

    if(!booking)throw new AppError('Admin Booking Error',400);

    bookingId = booking.insertId;

    console.log('booking id',bookingId); 

}

    const [court_price] = await com.pool.query('select hourly_price from court where id = ?',court_id);

    const price = court_price[0].hourly_price;

    let admin_booking_total_price = 0;

    const court_time_slot_ids_array = JSON.parse(court_time_slot_ids);

    console.log('court_time_slot_ids_array',court_time_slot_ids_array);

    for(let slotId of court_time_slot_ids_array){

            console.log('court_time_slot_ids_array',typeof court_time_slot_ids_array);

            admin_booking_total_price += price;

            console.log('admin_booking_total_price ',admin_booking_total_price);

            let slot_id = Number(slotId);

            console.log('slot_id',slot_id);
            console.log('slot_id',typeof slot_id);
            console.log('slotId ',typeof slotId);
            console.log('slotId',slotId);

            const [booking_time] = await com.pool.query('insert into admin_booking_time_slot (booking_id,court_time_slot_id) values(?,?)',[bookingId,slot_id]);

            if(!booking_time)throw new AppError('Admin booking_time Error',400);

            const booking_time_id = booking_time.insertId;

            console.log('Booking_time_id is : ', booking_time_id);

    }

    console.log('admin_booking_total_price all total : ',admin_booking_total_price);

    //price insert
    const admin_booking_all_data = await com.pool.query('update admin_booking set price = ? where id = ?',[admin_booking_total_price,bookingId]);

    if(!admin_booking_all_data)throw new AppError('admin booking price Error',400);

    //if equipment booking order

    if(items){

    const item = JSON.parse(items);

    console.log('item',item);


       let total = 0;

        for(const eq of item){

            const [eq_price] = await com.pool.query('select rental_price from equipment where id = ?',eq.equipment_id);

            const eqprice = eq_price[0].rental_price;

            const eq_id = eq.equipment_id;
            const quantity = eq.quantity;

            // admin_booking_total_price += eqprice;

            total = quantity * eqprice;

            console.log('total',total);

            admin_booking_total_price += total;


            // total += admin_booking_total_price;

            const insert_eq = await com.pool.query('insert into admin_booking_equipment (booking_id,equipment_id,quantity,price,total,department) values(?,?,?,?,?,?)',[bookingId,eq_id,quantity,eqprice,total,department]);

            if(!insert_eq)throw new AppError('Admin booking equipment Error',400);

    }

    console.log('admin_booking_total_price ',admin_booking_total_price);


    const [admin_booking_total_amount] = await com.pool.query('update admin_booking set amount = ? where id = ?',[admin_booking_total_price,bookingId]);

    if(!admin_booking_total_amount)throw new AppError('admin booking total amount Error',400);

}   

    let prindOrder;

    if(file || payment_method){
        
     [prindOrder] = await com.pool.query(`
         
             select 
                a.id,
                p.payment_method,
                a.reciept_no,
                DATE_FORMAT(a.create_at, '%Y-%m-%d') AS Date,
                DATE_FORMAT(a.create_at, '%h:%i:%s %p') AS Time,
                DATE_FORMAT(a.date, '%Y-%m-%d') AS date,
                a.price,
                a.amount

                from admin_booking a
                join payment p on p.id = a.payment_id
                join venue v on v.id = a.venue_id
                join court c on c.id = a.court_id
                join admin_booking_time_slot abts on abts.booking_id = a.id
                join court_time_slot cts on cts.id = abts.court_time_slot_id
                left join admin_booking_equipment abe on abe.booking_id = a.id
                left join equipment e on e.id = abe.equipment_id
                where a.id = ?
        `,[bookingId]);

    if(!prindOrder)throw new AppError('Admin Booking Print Data Error',400);

    console.log('prindOrder',prindOrder);

     }else{

        [prindOrder] = await com.pool.query(`
         
             select 
                a.id,
               -- p.payment_method,
                a.reciept_no,
                DATE_FORMAT(a.create_at, '%Y-%m-%d %h:%i:%s %p') AS create_at,
                DATE_FORMAT(a.date, '%Y-%m-%d') AS date,
                a.price,
                a.amount

                from admin_booking a
                -- join payment p on p.id = a.payment_id
                join venue v on v.id = a.venue_id
                join court c on c.id = a.court_id
                join admin_booking_time_slot abts on abts.booking_id = a.id
                join court_time_slot cts on cts.id = abts.court_time_slot_id
                left join admin_booking_equipment abe on abe.booking_id = a.id
                left join equipment e on e.id = abe.equipment_id
                where a.id = ?
        `,[bookingId]);

    if(!prindOrder)throw new AppError('Admin Booking Print Data Error',400);

    console.log('prindOrder',prindOrder);


     }


    const grouped = {};

            prindOrder.forEach(row => {
            if (!grouped[row.order_id]) {
                grouped[row.order_id] = {
                Registration: row.id,
                payment_method: row.payment_method,
                reciept_no: row.reciept_no,
                Date: row.Date,
                Time: row.Time,
                date: row.date,
                Court_Fee: row.price,
                Total: row.amount,
                };
            }
            // grouped[row.order_id].items.push({
            //     product_name: row.product_name,
            //     quantity: row.quantity,
            //     price: row.price,
            //     total: row.total
            // });

            });

            const result1 = Object.values(grouped);

            console.log('result1',result1);

    return result1;
}

                // select 
                // a.id,
                // v.venue_name,
                // c.court_name,
                // e.product_name,
                // p.payment_method,
                // a.reciept_no,
                // a.payment_image_url,
                // abe.quantity as equipment_quantity,
                // abe.price as equipment_price,
                // abe.total as equipment_total,
                // DATE_FORMAT(a.create_at, '%Y-%m-%d %h:%i:%s %p') AS create_at,
                // DATE_FORMAT(a.date, '%Y-%m-%d') AS date,
                // a.price,
                // a.amount

                // from admin_booking a
                // join payment p on p.id = a.payment_id
                // join venue v on v.id = a.venue_id
                // join court c on c.id = a.court_id
                // join admin_booking_time_slot abts on abts.booking_id = a.id
                // join court_time_slot cts on cts.id = abts.court_time_slot_id
                // left join admin_booking_equipment abe on abe.booking_id = a.id
                // left join equipment e on e.id = abe.equipment_id
                


exports.ShowLocalBookingData = async ()=>{

    const [prindOrder] = await com.pool.query(`
         
                SELECT
    a.id,
    v.venue_name,
    c.court_name,
    COALESCE(p.payment_method, 'Cash') AS payment_method,
    a.reciept_no,
    COALESCE(a.payment_image_url, 'Cash no photo') AS payment_image_url,

    DATE_FORMAT(a.create_at, '%Y-%m-%d') AS Date,
    DATE_FORMAT(a.create_at, '%h:%i:%s %p') AS Time,
    DATE_FORMAT(a.date, '%Y-%m-%d') AS date,

    a.price AS Court_Fee,
    a.amount AS Total,

    MAX(cts.start_time) AS start_time,
    MAX(cts.end_time) AS end_time,

    JSON_ARRAYAGG(
        JSON_OBJECT(
            'equipment', e.product_name,
            'quantity', abe.quantity,
            'price', abe.price,
            'total', abe.total
        )
    ) AS items

FROM admin_booking a

LEFT JOIN payment p
    ON p.id = a.payment_id

LEFT JOIN venue v
    ON v.id = a.venue_id

LEFT JOIN court c
    ON c.id = a.court_id

LEFT JOIN admin_booking_time_slot abts
    ON abts.booking_id = a.id

LEFT JOIN court_time_slot cts
    ON cts.id = abts.court_time_slot_id

LEFT JOIN admin_booking_equipment abe
    ON abe.booking_id = a.id

LEFT JOIN equipment e
    ON e.id = abe.equipment_id

GROUP BY a.id

ORDER BY a.id DESC;
                                `);

    return prindOrder;

}

exports.DeleteLocalBooking = async (id)=>{

    const [public_id] = await com.pool.query('select payment_public_id from admin_booking where id =?',[id]);

    if(!public_id)throw new AppError('Failed to find public id',500);

    console.log('public_id',public_id[0].payment_public_id);

    if(public_id[0].payment_public_id){

         await uploader.delete(public_id[0].payment_public_id);
         
    }

    const result = await com.pool.query('delete from admin_booking where id = ?',[id]);

    if(!result)throw new AppError('Delete admin booking Error',400);

    return true;
}
