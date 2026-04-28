const com = require('../../config/com');
const AppError = require("../../utils/AppError");
const logger = require('../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');



exports.addOrder = async (file,customer_name,total_amount,payment_method,payment_name,phone,userId)=>{


    const result = await uploader.upload(file, 'orders_payment_image');

    const imageUrl = result.image_url;
    
    // console.log('imageUrl',imageUrl);

    const publicId = result.public_id;
    
    console.log('publicId',publicId);

    const [addorder] = await com.pool.query('insert into orders (customer_name,total_amount,payment_method,payment_name,phone,payment_image_url,public_id,user_id) values (?,?,?,?,?,?,?,?)',[customer_name,total_amount,payment_method,payment_name,phone,imageUrl,publicId,userId]);

    if(!addorder)throw new AppError('Failed to add order',500);

    // console.log('addorder',addorder);

    return true;
}

exports.showOrderData = async ()=>{

    const [orderData] = await com.pool.query(`
                           select id as OrderNo,     
                           customer_name as Customer,
                           total_amount as Amount,
                           DATE_FORMAT(create_at, '%Y-%m-%d') as Date,
                           Time_FORMAT(create_at, '%H:%m:%s') as Time,
                           payment_method as Payment,
                           payment_image_url as PaymentProof,
                           order_status as OrderStatus from orders;`);
    
    if(orderData.length === 0)throw new AppError('No order data found',404);

    const data = orderData;

    return data;
}

exports.updateOrderAction = async (id,action)=>{

    const updateOrderAction = await com.pool.query('update orders set order_status = ? where id = ?',[action,id]);

    if(!updateOrderAction)throw new AppError('Failed to update order action',400);

    return true;

}



exports.deleteOrder = async (id)=>{

     const [public_id] = await com.pool.query('select public_id from orders where id = ?',[id]);

    if(!public_id)throw new AppError("Can not found public_id",404);

    console.log(public_id[0].public_id);

        const DeleteImage = await uploader.delete(public_id[0].public_id);

    if(!DeleteImage)throw new AppError('Failed to delete image',500);

    const deleteOrderId = await com.pool.query('delete from orders where id = ?',[id]);

    if(!deleteOrderId)throw new AppError("Can not delete order",400);

    return true;
    
}