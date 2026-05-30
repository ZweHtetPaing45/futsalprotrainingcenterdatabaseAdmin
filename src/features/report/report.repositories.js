const com = require('../../config/com');
const AppError = require('../../utils/AppError');
const logger = require('../../utils/logger');


exports.ReportOverview = async ()=>{

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
    
        if(!revenue_total)throw new AppError('Failed to get revenue',500);

        const [product] = await com.pool.query(`
                    SELECT
                    p.id,
                    p.name,
                    COUNT(*) AS total_count
                FROM (
                    SELECT product_id FROM admin_order_items
                    UNION ALL
                    SELECT product_id FROM mobile_order_items
                ) AS all_products
                JOIN products p
                    ON p.id = all_products.product_id
                GROUP BY p.id, p.name
                ORDER BY total_count DESC
                LIMIT 1;
                    `);

        if(!product)throw new AppError('Failed to get top product',500);

        const [customer] = await com.pool.query(`
            select count(*) as customer from createuser WHERE DATE(create_at) = CURDATE()
            `);

        if(!customer)throw new AppError('Failed to get customer',500);

        const [order] = await com.pool.query(`
            SELECT
            (
                SELECT COUNT(*)
                FROM admin_order
                WHERE order_status IN ('pending', 'complete')
            ) +
            (
                SELECT COUNT(*)
                FROM mobile_order
                WHERE order_status IN ('pending', 'complete')
            ) AS total_order_received;
            `);
        
        if(!order)throw new AppError('Failed to get order',500);

        const [trend] = await com.pool.query(`
                    SELECT
            YEAR(all_orders.create_at) AS year,
            MONTH(all_orders.create_at) AS month_num,
            MONTHNAME(all_orders.create_at) AS month_name,
            SUM(all_orders.amount) AS total_amount
        FROM (
            SELECT create_at, amount
            FROM admin_order
            WHERE order_status IN ('pending', 'complete')

            UNION ALL

            SELECT create_at, total_amount AS amount
            FROM mobile_order
            WHERE order_status IN ('pending', 'complete')
        ) AS all_orders
        GROUP BY
            YEAR(all_orders.create_at),
            MONTH(all_orders.create_at),
            MONTHNAME(all_orders.create_at)
        ORDER BY year, month_num;
            `)

        const total_revenue = Number(revenue_total[0].grand_total);
        const top_product = product[0].name;
        const new_customer = customer[0].customer;
        const order_received = order[0].total_order_received;
        const sale_trend = trend;
    
        console.log("total_revenue",total_revenue);

        return {
            total_revenue,
            top_product,
            new_customer,
            order_received,
            sale_trend
        };

}