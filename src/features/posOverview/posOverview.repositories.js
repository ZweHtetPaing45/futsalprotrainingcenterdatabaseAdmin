const com = require('../../config/com');
const AppError = require('../../utils/AppError');
const logger = require('../../utils/logger');


exports.getPosOverview = async ()=>{

    const [admin_order_count] = await com.pool.query('select count(*) as total_admin_order from admin_order;');

    // console.log("admin_order_count",admin_order_count[0].total_admin_order);

    const admin_order = admin_order_count[0].total_admin_order;

    const [mobile_order_count] = await com.pool.query('select count(*) as total_mobile_order from mobile_order;');

    // console.log("mobile_order_count",mobile_order_count[0].total_mobile_order);

    const mobile_order = mobile_order_count[0].total_mobile_order;

    const total_order = admin_order + mobile_order;

    console.log("total_order",total_order);


    const [product_count] = await com.pool.query(`
            SELECT COUNT(DISTINCT product_id) AS total_products
            FROM (
            SELECT product_id FROM admin_order_items
            UNION
            SELECT product_id FROM mobile_order_items
            ) AS all_products;
        `);

    // console.log("product_count",product_count[0].total_products);

    const total_products = product_count[0].total_products;

    console.log("total_products",total_products);

    const [customer] = await com.pool.query('select count(*) as total_customer from createuser');

    const total_customer = customer[0].total_customer;

    console.log("total_customer",total_customer);


    const [revenue_total] = await com.pool.query(`
        SELECT SUM(total) AS grand_total
        FROM (

        SELECT amount AS total
        FROM admin_order

        UNION ALL

        SELECT total_amount AS total
        FROM mobile_order

        ) AS all_orders; 
        `);

    const total_revenue = Number(revenue_total[0].grand_total);

    console.log("total_revenue",total_revenue);

    const [popular_product_id] = await com.pool.query(`
        SELECT product_id, COUNT(*) AS total_count
        FROM (

        SELECT product_id
        FROM admin_order_items

        UNION ALL

        SELECT product_id
        FROM mobile_order_items

        ) AS all_products

        GROUP BY product_id
        ORDER BY total_count DESC
        LIMIT 1;
        `);

        const popular_product = popular_product_id[0].product_id;

        // console.log("popular_product",popular_product);

        const [product] = await com.pool.query('select name,price from products where id = ?',[popular_product]);

        const [product_image] = await com.pool.query('select image_url from product_images where product_id = ?',[popular_product]);

        const popular_product_name = product[0].name;

        const popular_product_price = product[0].price;

        const popular_product_image = product_image[0].image_url;

        // console.log("popular_product_name",popular_product_name);
        // console.log("popular_product_price",popular_product_price);
        // console.log("popular_product_image",popular_product_image);

        const popular_product_data = {
            popular_product_name,
            popular_product_price,
            popular_product_image
        }

        console.log("popular_product_data",popular_product_data);

        const [top_customer_id] = await com.pool.query(`
            SELECT user_id, COUNT(*) AS total_orders
            FROM mobile_order
            GROUP BY user_id
            ORDER BY total_orders DESC
            LIMIT 1;
            `);

        const [top_customer] = await com.pool.query('select name,image_url,address from createuser where id = ?',[top_customer_id[0].user_id]);

        const top_customer_name = top_customer[0].name;

        const top_customer_image = top_customer[0].image_url;

        const top_customer_address = top_customer[0].address;

        // console.log("top_customer_name",top_customer_name);
        // console.log("top_customer_image",top_customer_image);
        // console.log("top_customer_address",top_customer_address);

        const top_customer_data = {
            top_customer_name,
            top_customer_image,
            top_customer_address
        }

        console.log("top_customer_data",top_customer_data);

        return {
            total_order,
            total_products,
            total_customer,
            total_revenue,
            popular_product_data,
            top_customer_data
        }
}