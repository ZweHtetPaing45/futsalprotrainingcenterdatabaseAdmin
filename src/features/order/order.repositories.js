const com = require('../../config/com');
const AppError = require("../../utils/AppError");
const logger = require('../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');



exports.addOrder = async (file,payment_method,items)=>{

    console.log('file',file);
    console.log('payment_method',payment_method);
    console.log('items',items);


    let subtotal = 0;

    const parsedItems = JSON.parse(items);

    if(!parsedItems)throw new AppError('Items must be a valid JSON string',400);

    console.log(items.product_id);

    for(let item of parsedItems){

        console.log('item',item);

        const [p] = await com.pool.query('select products.price,product_variants.stock from products join product_variants on product_variants.product_id = products.id where products.id = ?',[item.product_id]);

        console.log('p',p);

        if(p[0].stock < item.quantity){
            throw new AppError(`Not enough stock for product ID: ${item.product_id}`, 400);
        }
    }


    const result = await uploader.upload(file, 'admin_orders_payment_image');

    const imageUrl = result.image_url;
    
    console.log('imageUrl',imageUrl);

    const publicId = result.public_id;
    
    console.log('publicId',publicId);

    const [payment_id] = await com.pool.query('select id from payment where payment_method = ?',[payment_method]);

    console.log('payment_id',payment_id[0].id);

    const payment_method_id = payment_id[0].id;

    const [tax] = await com.pool.query('select id from tax;');

    console.log('tax',tax[0].id);

    const tax_id  = tax[0].id;

    const [order] = await com.pool.query('insert into admin_order (payment_id,tax_id,admin_image_url,admin_public_id) values (?,?,?,?)',
    [payment_method_id,tax_id,imageUrl,publicId]);

    const orderId = order.insertId;

    console.log('orderId',orderId);

    for(let item of parsedItems){
        const [p] = await com.pool.query('select price from products where id = ?',[item.product_id]);

        const price = p[0].price;

        console.log('price',price);

        const total = price * item.quantity;

        console.log('total',total);

        subtotal +=total;

        console.log('orderId',orderId);
        console.log('item.product_id',item.product_id);
        console.log('item.quantity',item.quantity);
        console.log('price',price);
        console.log('total',total);

        const [insertmobileorder] = await com.pool.query('insert into admin_order_items (admin_order_id,product_id,quantity,price,total) values (?,?,?,?,?)',
        [orderId,item.product_id,item.quantity,price,total]);

        if(!insertmobileorder){
            throw new AppError('Failed to create order',500);
        }

        const updateStock = await com.pool.query('update product_variants set stock = stock - ? where product_id = ?',[item.quantity,item.product_id]);

        if(!updateStock){
            throw new AppError('Failed to update stock',500);
        }

        console.log('subtotal',subtotal);

        const [tax] = await com.pool.query('select tax from tax where id = ?',[tax_id]);


        const finalTotal = subtotal + Number(tax[0].tax);
        
        console.log('finalTotal',finalTotal);

        const updateOrder = await com.pool.query('update admin_order set sub_total = ? , amount = ? where id = ?',[subtotal,finalTotal,orderId]);

        if(!updateOrder){
            throw new AppError('Failed to update order',500);
        }
    }

    const [prindOrder] = await com.pool.query(
                    `SELECT 
                        o.id AS order_id,
                        o.amount,
                        p2.payment_method,
                        t.tax,
                        p.name AS product_name,
                        oi.quantity,
                        oi.price,
                        oi.total,
                        CONVERT_TZ(o.create_at, '+00:00','+06:30') AS create_at,
                        o.sub_total
                    FROM admin_order o
                    JOIN admin_order_items oi ON o.id = oi.admin_order_id
                    JOIN products p ON p.id = oi.product_id
                    LEFT JOIN payment p2 ON p2.id = o.payment_id
                    LEFT JOIN tax t ON t.id = o.tax_id
                    WHERE o.id = ?;`
                    , [orderId]);

console.log('prindOrder',prindOrder);


            const grouped = {};

            prindOrder.forEach(row => {
            if (!grouped[row.order_id]) {
                grouped[row.order_id] = {
                order_id: row.order_id,
                create_at: row.create_at,
                customer_name: row.customer_name,
                items: [],
                Sub_total: row.sub_total,
                tax: row.tax,
                delivery_fee: row.delivery_fee,
                Total: row.amount,
                };
            }

            grouped[row.order_id].items.push({
                product_name: row.product_name,
                quantity: row.quantity,
                price: row.price,
                total: row.total
            });
            });

            const result1 = Object.values(grouped);

            console.log('result1',result1);

    return result1;

}

exports.showAdminOrderData = async ()=>{

//     const [orderData] = await com.pool.query(`
//                         SELECT 
//                         o.id AS order_id,
//                         o.amount,
//                         p2.payment_method,
//                         t.tax,
//                         p.name AS product_name,
//                         oi.quantity,
//                         oi.price,
//                         oi.total,
//                         CONVERT_TZ(o.create_at, '+00:00','+06:30') AS create_at,
//                         o.sub_total
//                     FROM admin_order o
//                     JOIN admin_order_items oi ON o.id = oi.admin_order_id
//                     JOIN products p ON p.id = oi.product_id
//                     LEFT JOIN payment p2 ON p2.id = o.payment_id
//                     LEFT JOIN tax t ON t.id = o.tax_id`);
    
//     if(orderData.length === 0)throw new AppError('No order data found',404);

//     const data = orderData;

//     return data;
// }


// exports.deleteOrder = async (id)=>{

//      const [public_id] = await com.pool.query('select public_id from orders where id = ?',[id]);

//     if(!public_id)throw new AppError("Can not found public_id",404);

//     console.log(public_id[0].public_id);

//         const DeleteImage = await uploader.delete(public_id[0].public_id);

//     if(!DeleteImage)throw new AppError('Failed to delete image',500);

//     const deleteOrderId = await com.pool.query('delete from orders where id = ?',[id]);

//     if(!deleteOrderId)throw new AppError("Can not delete order",400);

//     return true;



    const [result] = await com.pool.query(
                    `  SELECT 
                        o.id AS order_id,
                        o.amount,
                        o.admin_image_url,
                        p2.payment_method,
                        o.order_status,
                        t.tax,
                        p.name AS product_name,
                        oi.quantity,
                        oi.price,
                        oi.total,
                        DATE_FORMAT(o.create_at, '%Y-%m-%d') AS Date,
                        TIME(o.create_at) AS Time,
                        o.sub_total
                    FROM admin_order o
                    JOIN admin_order_items oi ON o.id = oi.admin_order_id
                    JOIN products p ON p.id = oi.product_id
                    LEFT JOIN payment p2 ON p2.id = o.payment_id
                    LEFT JOIN tax t ON t.id = o.tax_id`);

    const grouped = {};

            result.forEach(row => {
            if (!grouped[row.order_id]) {
                grouped[row.order_id] = {
                payment_method: row.payment_method,
                payment_proof: row.admin_image_url,
                order_status: row.order_status,
                order_id: row.order_id,
                Date: row.Date,
                Time: row.Time,
                customer_name: row.customer_name,
                items: [],
                Sub_total: row.sub_total,
                tax: row.tax,
                delivery_fee: row.delivery_fee,
                Total: row.amount,
                };
            }

            grouped[row.order_id].items.push({
                product_name: row.product_name,
                quantity: row.quantity,
                price: row.price,
                total: row.total
            });
            });

            const result1 = Object.values(grouped);

            console.log('result1',result1);

    return result1;
    
}

exports.showMobileOrderData = async ()=>{

    const [result] = await com.pool.query(
                    `SELECT 
                        o.id AS order_id,
                        o.mobile_image_url,
                        o.customer_name,
                        o.total_amount,
                        p2.payment_method,
                        t.tax,
                        p.name AS product_name,
                        oi.quantity,
                        oi.price,
                        oi.total,
                        DATE_FORMAT(o.create_at, '%Y-%m-%d') AS Date,
                        TIME(o.create_at) AS Time,
                        o.delivery_fee,
                        o.sub_total,
                        o.order_status
                    FROM mobile_order o
                    JOIN mobile_order_items oi ON o.id = oi.order_id
                    JOIN products p ON p.id = oi.product_id
                    LEFT JOIN payment p2 ON p2.id = o.payment_id
                    LEFT JOIN tax t ON t.id = o.tax_id ;`);

    const grouped = {};

            result.forEach(row => {
            if (!grouped[row.order_id]) {
                grouped[row.order_id] = {
                payment_method: row.payment_method,
                customer_name: row.customer_name,
                payment_proof: row.mobile_image_url,
                order_status: row.order_status,
                order_id: row.order_id,
                Date: row.Date,
                Time: row.Time,
                customer_name: row.customer_name,
                items: [],
                Sub_total: row.sub_total,
                tax: row.tax,
                delivery_fee: row.delivery_fee,
                Total: row.total_amount,
                };
            }

            grouped[row.order_id].items.push({
                product_name: row.product_name,
                quantity: row.quantity,
                price: row.price,
                total: row.total
            });
            });

            const result1 = Object.values(grouped);

            console.log('result1',result1);

    return result1;

}


exports.updateOrderAction = async (id,action)=>{

    const updateOrderAction = await com.pool.query('update mobile_order set order_status = ? where id = ?',[action,id]);

    if(!updateOrderAction)throw new AppError('Failed to update order action',400);

    return true;

}