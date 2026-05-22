const uploader = require('@zwehtetpaing55/uploader');
const com = require('../../../../config/com');
const AppError = require('../../../../utils/AppError');
const logger = require('../../../../utils/logger');


exports.ShowMobileBookingData = async ()=>{

    const [prindOrder] = await com.pool.query(`
         
                SELECT
                a.id,
                v.venue_name,
                c.court_name,
                p.payment_method,
                a.payment_image_url,
                a.name as Customer,
                DATE_FORMAT(a.create_at, '%Y-%m-%d %h:%i:%s %p') AS create_at,
                DATE_FORMAT(a.date, '%Y-%m-%d') AS date,
                a.rental as Court_Fee,
                a.amount as Total,

                JSON_ARRAYAGG(  
                    JSON_OBJECT(  
                        'equipment', e.product_name,  
                        'quantity', abe.quantity,  
                        'price', abe.price,  
                        'total', abe.total  
                    )  
                ) AS items

                FROM mobile_rental_booking a
                JOIN payment p ON p.id = a.payment_id
                JOIN venue v ON v.id = a.venue_id
                JOIN court c ON c.id = a.court_id
                LEFT JOIN mobile_rental_booking_equipment abe ON abe.mobile_rental_booking_id = a.id
                LEFT JOIN equipment e ON e.id = abe.equipment_id

                GROUP BY a.id;
                                `);

    // if(!prindOrder)throw new AppError('Admin Booking Print Data Error',400);

    // if(prindOrder === 0){
    //     return "No data found";
    // };

    //  const grouped = {};

    //         prindOrder.forEach(row => {
    //         if (!grouped[row.id]) {
    //             grouped[row.id] = {
    //             Registration: row.id,
    //             payment_method: row.payment_method,
    //             reciept_no: row.reciept_no,
    //             payment_image_url: row.payment_image_url,
    //             venue_name: row.venue_name,
    //             court_name: row.court_name,
    //             equipment: row.product_name,
    //             create_at: row.create_at,
    //             date: row.date,
    //             items: [],
    //             Court_Fee: row.price,
    //             Total: row.amount,
    //             };
    //         }

    //         grouped[row.id].items.push({
    //             equipment: row.product_name,
    //             quantity: row.equipment_quantity,
    //             price: row.equipment_price,
    //             total: row.equipment_total
    //         });

    //         });

    //         const result1 = Object.values(grouped);

    //         console.log('result1',result1);

    return prindOrder;

}

exports.DeleteMobileBooking = async (id)=>{

    const [public_id] = await com.pool.query('select payment_public_id from mobile_rental_booking where id = ?',[id]);

    if(!public_id)throw new AppError('Failed to find public id',500);

    console.log('public_id',public_id[0].payment_public_id);

    const DeleteImage = await uploader.delete(public_id[0].payment_public_id);

    const result = await com.pool.query('delete from mobile_rental_booking where id = ?',[id]);

    
    if(!result)throw new AppError('Delete mobile booking Error',400);

    return true;

}