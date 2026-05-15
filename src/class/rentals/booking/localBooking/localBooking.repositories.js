const com = require('../../../../config/com');
const AppError = require('../../../../utils/AppError');
const logger = require('../../../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');


exports.AdminBooking = async (venue_id,court_id,payment_id,reciept_no,date,court_time_slot_ids,department,items,file)=>{

    let image_url;
    let public_id;

    if(file){

        const result = await uploader.upload(file, 'admin_booking');

        image_url = result.image_url;
        public_id = result.public_id;

    }

    const [booking] = await com.pool.query('insert into admin_booking (venue_id,court_id,payment_id,reciept_no,date,payment_image_url,payment_public_id) values(?,?,?,?,?,?,?)',[venue_id,court_id,payment_id,reciept_no,date,image_url,public_id]);

    if(!booking)throw new AppError('Admin Booking Error',400);

    const bookingId = booking.insertId;

    console.log('booking id',bookingId);

    const [venue_price] = await com.pool.query('select price from venue where id = ?',venue_id);

    const price = venue_price[0].price;

    let admin_booking_total_price = 0;

    const court_time_slot_ids_array = JSON.parse(court_time_slot_ids);

    console.log('court_time_slot_ids_array',court_time_slot_ids_array);

    for(let slotId of court_time_slot_ids_array){

            console.log('court_time_slot_ids_array',typeof court_time_slot_ids_array);

            admin_booking_total_price += price;

            console.log('admin_booking_total_price ',admin_booking_total_price);

            let slot_id = Number(slotId);

            // console.log('slot_id',slot_id);
            // console.log('slot_id',typeof slot_id);
            // console.log('slotId ',typeof slotId);
            // console.log('slotId',slotId);

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

            // total += admin_booking_total_price;

            const insert_eq = await com.pool.query('insert into admin_booking_equipment (booking_id,equipment_id,quantity,price,total,department) values(?,?,?,?,?,?)',[bookingId,eq_id,quantity,eqprice,total,department]);

            if(!insert_eq)throw new AppError('Admin booking equipment Error',400);

    }

}

const [printBooking] = await com.pool.query(

    `SELECT 
    ab.id AS booking_id,
    ab.price,
    ab.reciept_no,
    p.payment_method,

    v.venue_name,
    c.court_name,

    cts.start_time,
    cts.end_time,

    e.product_name AS equipment_name,
    abe.quantity,
    abe.price,
    abe.total,

    CONVERT_TZ(ab.create_at, '+00:00', '+06:30') AS create_at

FROM admin_booking ab

JOIN venue v
    ON v.id = ab.venue_id

JOIN court c
    ON c.id = ab.court_id

LEFT JOIN payment p
    ON p.id = ab.payment_id

LEFT JOIN admin_booking_time_slot abts
    ON abts.booking_id = ab.id

LEFT JOIN court_time_slot cts
    ON cts.id = abts.court_time_slot_id

LEFT JOIN admin_booking_equipment abe
    ON abe.booking_id = ab.id

LEFT JOIN equipment e
    ON e.id = abe.equipment_id

WHERE ab.id = ?`
,
[bookingId]
);

console.log('printBooking', printBooking);

const grouped = {};

printBooking.forEach(row => {

    if (!grouped[row.booking_id]) {

        grouped[row.booking_id] = {

            booking_id: row.booking_id,
            payment_method: row.payment_method,
            reciept_no: row.reciept_no,
            create_at: row.create_at,

            venue_name: row.venue_name,
            court_name: row.court_name,

            time_slots: [],

            items: [],

            Total: row.price
        };
    }

    // time slot
    if (row.start_time && row.end_time) {

        const exists = grouped[row.booking_id]
        .time_slots
        .find(
            slot =>
                slot.start_time === row.start_time &&
                slot.end_time === row.end_time
        );

        if (!exists) {

            grouped[row.booking_id].time_slots.push({
                start_time: row.start_time,
                end_time: row.end_time
            });
        }
    }

    // equipment items
    if (row.equipment_name) {

        grouped[row.booking_id].items.push({

            equipment_name: row.equipment_name,
            quantity: row.quantity,
            price: row.price,
            total: row.total
        });
    }

});

const result = Object.values(grouped);

console.log('result', result);

return result;

    

}