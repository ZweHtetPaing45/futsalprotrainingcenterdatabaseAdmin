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
    return true;

}