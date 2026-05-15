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

    const result1 = await com.pool.query('insert into venue (venue_name,price,venue_image_url,venue_public_id,available) values(?,?,?,?,?)',[name,price,image_url,public_id,available]);

    if(!result1)throw new AppError('Failed to create venue',500);

    return true;
}

exports.NewEquipment = async(venue_id,product_name,rental_price,qty_total,file)=>{

    let image_url;
    let public_id;
    

    if(file){

        const result = await uploader.upload(file,'equipment_images');

        if(!result)throw new AppError('Failed to upload image',500);

        image_url = result.image_url;
        public_id = result.public_id;

    }

    const result1 = await com.pool.query('insert into equipment (venue_id,product_name,rental_price,qty_total,product_image_url,product_public_id) values(?,?,?,?,?,?)',[venue_id,product_name,rental_price,qty_total,image_url,public_id]);

    if(!result1)throw new AppError('Failed to create equipment',500);

    return true;
}

exports.NewRule = async (venue_id,name,description)=>{

    const result = await com.pool.query('insert into rule (venue_id,name,description) values(?,?,?)',[venue_id,name,description]);

    if(!result)throw new AppError('Failed to create rule',500);

    return true;

}

exports.NewService = async (venue_id,name)=>{

    const result = await com.pool.query('insert into service(venue_id,name) values(?,?)',[venue_id,name]);

    if(!result)throw new AppError('Failed to create service',500);

    return true;

}

exports.NewCourt = async (venue_id,court_name,hourly_price,open_at,close_at,about_court)=>{

    const result = await com.pool.query('insert into court (venue_id,court_name,hourly_price,open_at,close_at,about_court) values(?,?,?,?,?,?)',[venue_id,court_name,hourly_price,open_at,close_at,about_court]);

    if(!result)throw new AppError('Failed to create court',500);

    return true;

}

exports.NewCourt_time_slot = async (court_id,start_time,end_time)=>{

    const result = await com.pool.query('insert into court_time_slot (court_id,start_time,end_time) values(?,?,?)',[court_id,start_time,end_time]);

    if(!result)throw new AppError('Failed to create court time slot',500);

    return true;

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

    const result1 = await com.pool.query('insert into court_gallery (court_id,court_image_url,court_public_id) values(?,?,?)',[court_id,court_image_url,court_public_id]);

    if(!result1)throw new AppError('Failed to create court gallery',500);

    return true;

}

exports.NewPros = async (court_id,name)=>{

    const result = await com.pool.query('insert into pros (court_id,name) values(?,?)',[court_id,name]);

    if(!result)throw new AppError('Failed to create pro',500);

    return true;

}

exports.NewCons = async (court_id,name)=>{

    const result = await com.pool.query('insert into cons (court_id,name) values(?,?)',[court_id,name]);

    if(!result)throw new AppError('Failed to create con',500);

    return true;

}

exports.ShowVenue = async ()=>{

    let [result] = await com.pool.query('select id,venue_name,price,venue_image_url,available from venue');

    result[0].available = result[0].available === 1 ? true : false;

    if(!result)throw new AppError('Failed to show venue',500);

    if(result.length === 0){
        return "No venue found";
    };

    return result;
}

exports.ShowEquipment = async (venue_id)=>{

    const [result] = await com.pool.query('select e.id,e.product_name,e.rental_price,e.qty_total from equipment e join venue v on e.venue_id = v.id where v.id = ?',[venue_id]);

    if(!result)throw new AppError('Failed to show equipment',500);

    if(result.length === 0){
        return "No equipment found";
    };

    return result;

}

exports.ShowRule = async (venue_id)=>{

    const [result] = await com.pool.query('select r.id,r.name,r.description from rule r join venue v on r.venue_id = v.id where v.id = ?',[venue_id]);

    if(!result)throw new AppError('Failed to show rule',500);

    if(result.length === 0){
        return "No rule found";
    };

    return result;

}

exports.ShowService = async (venue_id)=>{

    const [result] = await com.pool.query('select s.id,s.name from service s join venue v on s.venue_id = v.id where v.id = ?',[venue_id]);

    if(!result)throw new AppError('Failed to show service',500);

    if(result.length === 0){
        return "No service found";
    };

    return result;

}

exports.ShowCourt = async (venue_id)=>{
    
    const [result] = await com.pool.query(`
                SELECT 
                c.id,
                c.court_name,
                c.hourly_price,
                c.open_at,
                c.close_at,
                c.about_court,

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
                            -- 'id', g.id,
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
                           -- 'id', p.id,
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
                            -- 'id', co.id,
                            'name', co.name
                        )
                    )
                    FROM cons co
                    WHERE co.court_id = c.id
                ) AS cons

            FROM court c
            WHERE c.venue_id = ?;`,[venue_id]);

    if(!result)throw new AppError('Failed to show court',500);

    if(result.length === 0){
        return "No court found";
    };

    return result;

}