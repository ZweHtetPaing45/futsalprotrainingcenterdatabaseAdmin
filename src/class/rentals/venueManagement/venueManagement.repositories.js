const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');


exports.NewVenue = async (name,price,file,available)=>{

    let image_url;
    let public_id;

    if(file){

        const result = await uploader.upload(file,'venue_images');

        if(!result)throw new AppError('Failed to upload image',500);

        image_url = result.image_url;
        public_id = result.public_id;

    }

    const [result1] = await com.pool.query('insert into venue (venue_name,price,venue_image_url,venue_public_id,available) values(?,?,?,?,?)',[name,price,image_url,public_id,available]);

    if(!result1)throw new AppError('Failed to create venue',500);

    console.log(result1.insertId);

    return result1.insertId;
}

exports.NewEquipment = async(venue_id,product_name,rental_price,qty_total,file)=>{

    // let image_url;
    // let public_id;
    

    // if(file){

    //     const result = await uploader.upload(file,'equipment_images');

    //     if(!result)throw new AppError('Failed to upload image',500);

    //     image_url = result.image_url;
    //     public_id = result.public_id;

    // }

    const [result1] = await com.pool.query('insert into equipment (venue_id,product_name,rental_price,qty_total) values(?,?,?,?)',[venue_id,product_name,rental_price,qty_total]);

    if(!result1)throw new AppError('Failed to create equipment',500);

    return result1.insertId;
}

exports.NewRule = async (venue_id,name,description)=>{

    const [result] = await com.pool.query('insert into rule (venue_id,name,description) values(?,?,?)',[venue_id,name,description]);

    if(!result)throw new AppError('Failed to create rule',500);

    return true;

}

exports.NewService = async (venue_id,name)=>{

    const [result] = await com.pool.query('insert into service(venue_id,name) values(?,?)',[venue_id,name]);

    if(!result)throw new AppError('Failed to create service',500);

    return true;

}

exports.NewCourt = async (venue_id,court_name,hourly_price,open_at,close_at,about_court,court_active)=>{

    const [result] = await com.pool.query('insert into court (venue_id,court_name,hourly_price,open_at,close_at,about_court,court_active) values(?,?,?,?,?,?,?)',[venue_id,court_name,hourly_price,open_at,close_at,about_court,court_active]);

    if(!result)throw new AppError('Failed to create court',500);

    return result.insertId;

}

exports.NewCourt_time_slot = async (court_id,start_time,end_time)=>{

    const [result] = await com.pool.query('insert into court_time_slot (court_id,start_time,end_time) values(?,?,?)',[court_id,start_time,end_time]);

    if(!result)throw new AppError('Failed to create court time slot',500);

    return result.insertId;

}

exports.NewCourt_gallery = async(court_id,file)=>{

    let court_image_url;
    let court_public_id;
    
    if(file){

        const result = await uploader.upload(file,'court_gallery');

        if(!result)throw new AppError('Failed to upload image',500);

        court_image_url = result.image_url;
        court_public_id = result.public_id;

    }

    const [result1] = await com.pool.query('insert into court_gallery (court_id,court_image_url,court_public_id) values(?,?,?)',[court_id,court_image_url,court_public_id]);

    if(!result1)throw new AppError('Failed to create court gallery',500);

    return true;

}

exports.NewPros = async (court_id,name)=>{

    const [result] = await com.pool.query('insert into pros (court_id,name) values(?,?)',[court_id,name]);

    if(!result)throw new AppError('Failed to create pro',500);

    return true;

}

exports.NewCons = async (court_id,name)=>{

    const [result] = await com.pool.query('insert into cons (court_id,name) values(?,?)',[court_id,name]);

    if(!result)throw new AppError('Failed to create con',500);

    return true;

}

exports.ShowVenue = async ()=>{

    let [result] = await com.pool.query('select id,venue_name,price,venue_image_url,available from venue');

    if(!result)throw new AppError('Failed to show venue',500);

    if(result.length === 0){
        return [];
    };

    for(let i = 0; i < result.length; i++){

        result[i].available = result[i].available === 1 ? true : false;

    }

    return result;
}

// exports.ShowEquipment = async (venue_id)=>{

//     const [result] = await com.pool.query('select e.id,e.product_name,e.rental_price,e.qty_total from equipment e join venue v on e.venue_id = v.id where v.id = ?',[venue_id]);

//     if(!result)throw new AppError('Failed to show equipment',500);

//     if(result.length === 0){
//         return "No equipment found";
//     };

//     return result;

// }

// exports.ShowRule = async (venue_id)=>{

//     const [result] = await com.pool.query('select r.id,r.name,r.description from rule r join venue v on r.venue_id = v.id where v.id = ?',[venue_id]);

//     if(!result)throw new AppError('Failed to show rule',500);

//     if(result.length === 0){
//         return "No rule found";
//     };

//     return result;

// }

// exports.ShowService = async (venue_id)=>{

//     const [result] = await com.pool.query('select s.id,s.name from service s join venue v on s.venue_id = v.id where v.id = ?',[venue_id]);

//     if(!result)throw new AppError('Failed to show service',500);

//     if(result.length === 0){
//         return "No service found";
//     };

//     return result;

// }

exports.ShowCourt = async (venue_id)=>{
    
    const [result] = await com.pool.query(`
               SELECT 
            c.id,
            c.court_name,
            c.hourly_price,
            c.open_at,
            c.close_at,
            c.about_court,
            c.court_active,

            -- Time Slots
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', ts.id,
                        'start_time', ts.start_time,
                        'end_time', ts.end_time
                    )
                )
                FROM court_time_slot ts
                WHERE ts.court_id = c.id
            ) AS time_slots,

            -- Gallery
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'court_image_url', g.court_image_url,
                        'court_public_id', g.court_public_id
                    )
                )
                FROM court_gallery g
                WHERE g.court_id = c.id
            ) AS gallery,

            -- Pros
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'name', p.name
                    )
                )
                FROM pros p
                WHERE p.court_id = c.id
            ) AS pros,

            -- Cons
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'name', co.name
                    )
                )
                FROM cons co
                WHERE co.court_id = c.id
            ) AS cons,

            -- Services
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'name', s.name
                    )
                )
                FROM service s
                WHERE s.venue_id = c.venue_id
            ) AS services,

            -- Rules
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'name', r.name,
                        'detail', r.description
                    )
                )
                FROM rule r
                WHERE r.venue_id = c.venue_id
            ) AS rules,

            -- Equipment
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', e.id,
                        'product_name', e.product_name,
                        'rental_price', e.rental_price,
                        'qty_total', e.qty_total
                    )
                )
                FROM equipment e
                WHERE e.venue_id = c.venue_id
            ) AS equipment

        FROM court c
        WHERE c.venue_id = ?;`,[venue_id]);

    if(!result)throw new AppError('Failed to show court',500);

    if(result.length === 0){
        return [];
    };

     for(let i = 0; i < result.length; i++){

        result[i].court_active = result[i].court_active === 1 ? true : false;

    }

    return result;

}


exports.DeleteVenue = async (id)=>{

        const [venuePublicId] = await com.pool.query('select venue_public_id from venue where id = ?',[id]);

        if(!venuePublicId)throw new AppError('Failed to find venue',500);

        console.log('venuePublicId',venuePublicId[0].venue_public_id);

        // if(venuePublicId.length === 0){
        //     throw new AppError('Venue not found',404);
        // };

        if(venuePublicId[0].venue_public_id){
            try{
                const result = await uploader.delete(venuePublicId[0].venue_public_id);
            }catch(err){
                logger.error(`Failed to delete venue image with public id ${venuePublicId[0].venue_public_id}: ${err.message}`);
            }            // if(!result)throw new AppError('Failed to delete image',500)ca;
        }

        const [courtId] = await com.pool.query('select id from court where venue_id = ?',[id]);

        if(!courtId)throw new AppError('Failed to find court',500);

        console.log('courtId',courtId);

        for(let j=0; j<courtId.length; j++){

            const [courtIdGalleryPublicId] = await com.pool.query('select court_public_id from court_gallery where court_id = ?',[courtId[j].id]);

        console.log('courtIdGalleryPublicId',courtIdGalleryPublicId);

        if(!courtIdGalleryPublicId)throw new AppError('Failed to find court gallery',500);

        for(let i = 0; i < courtIdGalleryPublicId.length; i++){
           
            if(courtIdGalleryPublicId[i].court_public_id){
                
                try{

                    const result = await uploader.delete(courtIdGalleryPublicId[i].court_public_id);

                }catch(err){
                    logger.error(`Failed to delete court gallery image with public id ${courtIdGalleryPublicId[i].court_public_id}: ${err.message}`);
                }
                // if(!result)throw new AppError('Failed to delete court gallery image',500);
            }
        }

        const [paymentPublicId] = await com.pool.query('select payment_public_id from admin_booking where venue_id = ?',[id]);
        
        if(!paymentPublicId)throw new AppError('Failed to find payment',500);

        console.log('paymentPublicId',paymentPublicId);

        for(let i = 0; i < paymentPublicId.length; i++){
            
            if(paymentPublicId[i].payment_public_id){
                try{

                    console.log('paymentPublicId[i].payment_public_id',paymentPublicId[i].payment_public_id);

                    const result = await uploader.delete(paymentPublicId[i].payment_public_id);

                }catch(err){
                    logger.error(`Failed to delete payment image with public id ${paymentPublicId[i].payment_public_id}: ${err.message}`);
                }
                // if(!result)throw new AppError('Failed to delete payment image',500);
            }
        }

        const [mobileBooking] = await com.pool.query('select payment_public_id from mobile_rental_booking where venue_id = ?',[id]);

        if(!mobileBooking)throw new AppError('Failed to find mobile booking',500);

        console.log('mobileBooking',mobileBooking);

        for(let i = 0; i < mobileBooking.length; i++){
            
            if(mobileBooking[i].payment_public_id){
                try{

                    console.log('mobileBooking[i].payment_public_id',mobileBooking[i].payment_public_id);

                    const result = await uploader.delete(mobileBooking[i].payment_public_id);

                }catch(err){
                    logger.error(`Failed to delete mobile booking payment image with public id ${mobileBooking[i].payment_public_id}: ${err.message}`);
                }
                // if(!result)throw new AppError('Failed to delete mobile booking payment image',500);
            }

        }

    }
        const result = await com.pool.query('delete from venue where id = ?',[id]);

        if(!result)throw new AppError('Failed to delete venue',500);

        if(result.affectedRows === 0){
            throw new AppError('Failed to delete venue',404);
        };

        return true;

}

exports.RemainBookingTimeSlot = async (court_id,date)=>{

    const [remainBookingTimeSlot] = await com.pool.query(`
        SELECT *
FROM court_time_slot
WHERE court_id = ?
AND id NOT IN (

    -- Admin booking slots
    SELECT abts.court_time_slot_id
    FROM admin_booking_time_slot abts
    JOIN admin_booking ab
        ON ab.id = abts.booking_id
    WHERE ab.date = ?

    UNION

    -- Mobile booking slots
    SELECT mrts.court_time_slot_id
    FROM mobile_rental_time_slot mrts
    JOIN mobile_rental_booking mrb
        ON mrb.id = mrts.mobile_rental_booking_id
    WHERE mrb.date = ?
);
        `,[court_id,date,date]);

    if(!remainBookingTimeSlot)throw new AppError('Remain Booking Time Slot Error',400);

 
    return remainBookingTimeSlot;
}


exports.UpdateCourtTrueOrFalse = async (court_id,status)=>{

    const [result] = await com.pool.query('update court set court_active = ? where id = ?',[status,court_id]);

    if(result.affectedRows === 0)throw new AppError('Failed to update court',404);

    return true;

}

exports.AllShowCourt = async ()=>{

    const [result] = await com.pool.query(`
         SELECT 
            c.id,
            c.court_name,
            c.hourly_price,
            c.open_at,
            c.close_at,
            c.about_court,
            c.court_active,

            -- Time Slots
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', ts.id,
                        'start_time', ts.start_time,
                        'end_time', ts.end_time
                    )
                )
                FROM court_time_slot ts
                WHERE ts.court_id = c.id
            ) AS time_slots,

            -- Gallery
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id' , g.id,
                        'court_image_url', g.court_image_url,
                        'court_public_id', g.court_public_id
                    )
                )
                FROM court_gallery g
                WHERE g.court_id = c.id
            ) AS gallery,

            -- Pros
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', p.id,
                        'name', p.name
                    )
                )
                FROM pros p
                WHERE p.court_id = c.id
            ) AS pros,

            -- Cons
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', co.id,
                        'name', co.name
                    )
                )
                FROM cons co
                WHERE co.court_id = c.id
            ) AS cons,

            -- Services
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', s.id,
                        'name', s.name
                    )
                )
                FROM service s
                WHERE s.venue_id = c.venue_id
            ) AS services,

            -- Rules
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', r.id,
                        'name', r.name,
                        'detail', r.description
                    )
                )
                FROM rule r
                WHERE r.venue_id = c.venue_id
            ) AS rules,

            -- Equipment
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', e.id,
                        'product_name', e.product_name,
                        'rental_price', e.rental_price,
                        'qty_total', e.qty_total
                    )
                )
                FROM equipment e
                WHERE e.venue_id = c.venue_id
            ) AS equipment

        FROM court c ;
        `);

     if(!result)throw new AppError('Failed to show court',500);

    if(result.length === 0){
        return [];
    };


    for(let i = 0; i < result.length; i++){

        result[i].court_active = result[i].court_active === 1 ? true : false;

    }

    return result;

}

exports.updateVenue = async (id,venue_name,price,file,available)=>{

    let query = "UPDATE venue SET ";
    let values = [];
 
    if (venue_name !== '') {
    query += "venue_name = ?, ";
    values.push(venue_name);
    }

    if(price !== ''){
        query += "price = ?, ";
        values.push(price);
    }

    if(available !== ''){
        available = available === 'true' ? 1 : 0;
        query += "available = ?, ";
        values.push(available);
    }

    if (file) {
    const [old] = await com.pool.query(
      "SELECT venue_public_id FROM venue WHERE id = ?",
      [id]
    );

    const pu_id = old[0]?.venue_public_id;

    console.log('pu_id',pu_id);

    if (pu_id) {
      await uploader.delete(pu_id);
    }

    const result = await uploader.upload(file, "venue_images");

    query += "venue_image_url = ?, venue_public_id = ?, ";
    values.push(result.image_url, result.public_id);
  }

  // ❗️ ဘာမှ update မရှိဘူးဆို
  if (values.length === 0) {
    return false;
  }

  // remove last comma
  query = query.slice(0, -2);

  query += " WHERE id = ?";
  values.push(id);

  const [result] = await com.pool.query(query, values);

  if(!result)throw new AppError('Failed to update venue',500);

  if(result.affectedRows === 0){
    throw new AppError('Failed to update venue',404);
  };

  return true;

}

exports.DeletePros = async (pro_id)=>{

    const result = await com.pool.query('delete from pros where id = ?',[pro_id]);

    if(!result)throw new AppError('Pros Delete Error ',400);

    return true;
}

exports.DeleteCons = async (con_id)=>{

    const result = await com.pool.query('delete from cons where id = ?',[con_id]);

    if(!result)throw new AppError('Delete Cons Error',400);

    return true;

}

exports.DeleteCourtTimeSlot = async (court_time_slot_id)=>{

    const result = await com.pool.query('delete from court_time_slot where id = ?',[court_time_slot_id]);

    if(!result)throw new AppError('Delete Court Time Slot Error',400);

    return true;

}

exports.DeleteService = async (service_id)=>{

    const result = await com.pool.query('delete from service where id = ?',[service_id]);

    if(!result)throw new AppError('Delete Service Error',400);

    return true;

}

exports.DeleteRule = async (rule_id)=>{

    const result = await com.pool.query('delete from rule where id = ?',[rule_id]);

    if(!result)throw new AppError('Delete Rule Error',400);

    return true;

}

exports.DeleteEquipment = async (equipment_id)=>{

    const result = await com.pool.query('delete from equipment where id = ?',[equipment_id]);

    if(!result)throw new AppError('Delete Equipment Error',400);

    return true;

}