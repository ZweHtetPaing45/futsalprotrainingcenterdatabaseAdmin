const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');
const uploader = require('@zwehtetpaing55/uploader');



exports.CanteenAddOrder = async (payment_id,reciept_no,items,file)=>{

    console.log('file',file);
    console.log('payment_id',payment_id);
    console.log('items',items);


    let subtotal = 0;

    const parsedItems = JSON.parse(items);

    if(!parsedItems)throw new AppError('Items must be a valid JSON string',400);

    console.log(items.product_id);

    // for(let item of parsedItems){

    //     console.log('item',item);

    //     const [p] = await com.pool.query('select products.price,product_variants.stock from products join product_variants on product_variants.product_id = products.id where products.id = ?',[item.product_id]);

    //     console.log('p',p);

    //     if(p[0].stock < item.quantity){
    //         throw new AppError(`Not enough stock for product ID: ${item.product_id}`, 400);
    //     }
    // }


    const result = await uploader.upload(file, 'canteen_orders_payment_image');

    const imageUrl = result.image_url;
    
    console.log('imageUrl',imageUrl);

    const publicId = result.public_id;
    
    console.log('publicId',publicId);

    const [order] = await com.pool.query('insert into canteen_order(payment_id,payment_image_url,payment_public_id,reciept_no) values (?,?,?,?)',
    [payment_id,imageUrl,publicId,reciept_no]);

    const orderId = order.insertId;

    console.log('orderId',orderId);

    for(let item of parsedItems){

        const [p] = await com.pool.query('select price from canteen_products where id = ?',[item.product_id]);

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

        const [insertmobileorder] = await com.pool.query('insert into canteen_order_item(canteen_order_id,canteen_product_id,quantity,price,total) values (?,?,?,?,?)',
        [orderId,item.product_id,item.quantity,price,total]);

        if(!insertmobileorder){
            throw new AppError('Failed to create order',500);
        }

        console.log('subtotal',subtotal);

        const finalTotal = subtotal;
        
        console.log('finalTotal',finalTotal);

        const updateOrder = await com.pool.query('update canteen_order set amount = ? where id = ?',[finalTotal,orderId]);

        if(!updateOrder){
            throw new AppError('Failed to update order',500);
        }
    }

    const [prindOrder] = await com.pool.query(
                    `SELECT 
                        o.id AS order_id,
                        o.amount,
                        o.reciept_no As reciept_no,
                        p2.payment_method,
                        p.name AS product_name,
                        oi.quantity,
                        oi.price,
                        oi.total,
                        CONVERT_TZ(o.create_at, '+00:00','+06:30') AS create_at
                    FROM canteen_order o
                    JOIN canteen_order_item oi ON o.id = oi.canteen_order_id
                    JOIN canteen_products p ON p.id = oi.canteen_product_id
                    LEFT JOIN payment p2 ON p2.id = o.payment_id
                    WHERE o.id = ?;`
                    , [orderId]);

console.log('prindOrder',prindOrder);


            const grouped = {};

            prindOrder.forEach(row => {
            if (!grouped[row.order_id]) {
                grouped[row.order_id] = {
                order_id: row.order_id,
                payment_method: row.payment_method,
                reciept_no: row.reciept_no,
                create_at: row.create_at,
                items: [],
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

exports.ShowCanteenOrderData = async ()=>{

    const [prindOrder] = await com.pool.query(
                    `SELECT 
                        o.id AS order_id,
                        o.amount,
                        o.payment_image_url,
                        o.reciept_no As reciept_no,
                        p2.payment_method,
                        p.name AS product_name,
                        oi.quantity,
                        oi.price,
                        oi.total,
                        DATE_FORMAT(o.create_at, '%Y-%m-%d %h:%i:%s %p') AS create_at
                    FROM canteen_order o
                        JOIN canteen_order_item oi ON o.id = oi.canteen_order_id
                        JOIN canteen_products p ON p.id = oi.canteen_product_id
                    LEFT JOIN payment p2 ON p2.id = o.payment_id;`
                );

console.log('prindOrder',prindOrder);

            const grouped = {};

            prindOrder.forEach(row => {
            if (!grouped[row.order_id]) {
                grouped[row.order_id] = {
                order_id: row.order_id,
                payment_method: row.payment_method,
                payment_image: row.payment_image_url,
                reciept_no: row.reciept_no,
                create_at: row.create_at,
                items: [],
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