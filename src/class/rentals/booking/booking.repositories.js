const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');



//CRUD Sport Type
exports.addSportType = async (name)=>{

    const result = await com.pool.query('insert into admin_booking_sport_type (sport_name) values (?)',[name]);

    if(!result)throw new AppError('Failed to create sport type',500);

    return true;

}

exports.showSportType = async ()=>{

    const [result] = await com.pool.query('select id,sport_name from admin_booking_sport_type');

    if(!result)throw new AppError('Failed to show sport type',500);
    if(result.length === 0)throw new AppError('Sport type not found',404);

    return result;

}

exports.updateSportType = async (id,name)=>{

    const result = await com.pool.query('update admin_booking_sport_type set sport_name = ? where id = ?',[name,id]);

    if(result.affectedRows === 0)throw new AppError('Failed to update sport type',404);

    return true;

}

exports.deleteSportType = async (id)=>{

    const result = await com.pool.query('delete from admin_booking_sport_type where id = ?',[id]);

    if(result.affectedRows === 0)throw new AppError('Failed to delete sport type',404);

    return true;

}


//CRUD Court Name
exports.addCourtName = async (name)=>{

    const result = await com.pool.query('insert into admin_booking_court_name (court_name) values (?)',[name]);

    if(!result)throw new AppError('Failed to create court name',500);

    return true;
}

exports.showCourtName = async ()=>{
    
    const [result] = await com.pool.query('select id,court_name from admin_booking_court_name');

    if(!result)throw new AppError('Failed to show court name',500);
    if(result.length === 0)throw new AppError('Court name not found',404);

    return result;
}

exports.updateCourtName = async (id,name)=>{
    
    const result = await com.pool.query('update admin_booking_court_name set court_name = ? where id = ?',[name,id]);

    if(result.affectedRows === 0)throw new AppError('Failed to update court name',404);

    return true;
}

exports.deleteCourtName = async (id)=>{

    const result = await com.pool.query('delete from admin_booking_court_name where id = ?',[id]);

    if(result.affectedRows === 0)throw new AppError('Failed to delete court name',404);

    return true;

}


//CRUD Start Time
exports.addStartTime = async (time)=>{

    const result = await com.pool.query('insert into admin_booking_start_time (start_time) values (?)',[time]);

    if(!result)throw new AppError('Failed to create start time',500);

    return true;

}

exports.showStartTime = async ()=>{

    const [result] = await com.pool.query('select id,start_time from admin_booking_start_time');

    if(!result)throw new AppError('Failed to show start time',500);
    if(result.length === 0)throw new AppError('Start time not found',404);

    return result;

}

exports.updateStartTime = async (id,time)=>{

    const result = await com.pool.query('update admin_booking_start_time set start_time = ? where id = ?',[time,id]);

    if(result.affectedRows === 0)throw new AppError('Failed to update start time',404);

    return true;

}

exports.deleteStartTime = async (id)=>{

    const result = await com.pool.query('delete from admin_booking_start_time where id = ?',[id]);

    if(result.affectedRows === 0)throw new AppError('Failed to delete start time',404);

    return true;

}