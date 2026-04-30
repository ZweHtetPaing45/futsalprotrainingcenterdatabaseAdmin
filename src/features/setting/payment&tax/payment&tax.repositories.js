const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');


// Product CRUD

exports.addPayment = async (payment_method,payment_name,payment_number,file)=>{

    const [findPayment] = await com.pool.query('select payment_method from payment where payment_method = ?',[payment_method]);

    console.log('findPayment',findPayment);

    if(findPayment.length>0)throw new AppError('Payment method already exist',400);
 
    const result = await uploader.upload(file,'payment_image');

    const imageUrl = result.image_url;
    console.log('imageUrl',imageUrl);
    const publicUrl = result.public_id;
    console.log('publicUrl',publicUrl);

    const result1 = await com.pool.query('insert into payment (payment_method,payment_name,payment_image_url,payment_public_id,payment_number) values(?,?,?,?,?)',[payment_method,payment_name,imageUrl,publicUrl,payment_number]);

    if(!result1)throw new AppError('Failed to add payment',500);

    return true;

}

exports.updatePayment = async (id,payment_method,payment_name,payment_number,file)=>{

    const [findPayment] = await com.pool.query('select payment_method from payment where payment_method = ?',[payment_method]);

    console.log('findPayment',findPayment);

    if(findPayment.length>0)throw new AppError('Can not payment method but it already exist',400);

    let query = "UPDATE payment SET ";
    let values = [];

    if(payment_method !== '') {
        query += "payment_method = ?, ";
        values.push(payment_method);
    }

    if(payment_name !== '') {
        query += "payment_name = ?, ";
        values.push(payment_name);
    }

    if(payment_number !== '') {
        query += "payment_number = ?, ";
        values.push(payment_number);
    }


    if (file) {
        const [old] = await com.pool.query(
        "SELECT payment_public_id FROM payment WHERE id = ?",
        [id]
        );

        const pu_id = old[0]?.payment_public_id;

        if (pu_id) {
        await uploader.delete(pu_id);
        }

        const result = await uploader.upload(file, "payment_image");

        query += "payment_image_url = ?, payment_public_id = ?, ";
        values.push(result.image_url, result.public_id);
    }

    if (values.length === 0) {
        return false;
    }
    // remove last comma
    query = query.slice(0, -2);

    query += " WHERE id = ?";
    values.push(id);

    const [result] = await com.pool.query(query, values);

    if (result.affectedRows === 0) {
        throw new AppError("Failed to update payment", 500);
    }

    return true;
}

exports.deletePayment = async (id)=>{

    const [deletePayment] = await com.pool.query('delete from payment where id = ?',[id]);

    if(deletePayment.affectedRows === 0){
        // console.log('No payment found with that id');
        return false;
    }

    return true;
}

exports.showPayment = async ()=>{
    const [result] = await com.pool.query('select id,payment_method,payment_name,payment_image_url,payment_number from payment');

    if(result.length === 0)throw new AppError('No payment found',404);

    return result;
}


//Tax 

exports.addingTax = async (tax)=>{

    const [addingTax] = await com.pool.query('insert into tax (tax) values (?)',[tax]);

    if(!addingTax)throw new AppError('Failed to add tax',500);

    return true;

}

exports.updateTax = async (id,tax)=>{

    const [updateTax] = await com.pool.query('update tax set tax = ? where id =?',[tax,id]);

    if(updateTax.affectedRows === 0)throw new AppError('Failed to update tax',404);

    return true;

}