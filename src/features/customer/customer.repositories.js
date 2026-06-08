const AppError = require("../../utils/AppError");
const logger = require("../../utils/logger");
const com = require('../../config/com');
const uploader = require('@zwehtetpaing55/uploader');



exports.showCustomerData = async ()=>{

    const [customerData] = await com.pool.query(`
        select
            id,
            name,
            address,
            phone,
            email,
            case when warning = 1 then 'true' else 'false' end as warning
        from createuser
        `)

    if(customerData.length === 0){
        return 'No Data Found';
    }

    return customerData;
}

exports.deleteCustomer = async (id)=>{

    const publicId = await com.pool.query('select public_id from createuser where id = ?',[id]);

    console.log(publicId[0][0].public_id);

    // if(publicId.length === 0)throw new AppError('No data found with that id',404);

    if(publicId[0][0].public_id === null){
     
    const [deleteData] = await com.pool.query('delete from createuser where id = ?',[id]);

    console.log(deleteData);

    if(deleteData.affectedRows === 0)throw new AppError('No data found with that id',500);

    return true;    

}
    
    const deleteImage = await uploader.delete(publicId[0][0].public_id);

    // if(!deleteImage)throw new AppError('Failed to delete customer image',500);

    const [deleteData] = await com.pool.query('delete from createuser where id = ?',[id]);

    console.log(deleteData);

    if(deleteData.affectedRows === 0)throw new AppError('No data found with that id',500);

    return true;

}

exports.WarningCustomer = async (id,warning)=>{

    const [update_warning] = await com.pool.query(`
        update createuser set warning = ? where id = ?
        `,[warning,id]);

    if(warning.affectedRows === 0)throw new AppError('No data found with that id',500);

    return true;
}