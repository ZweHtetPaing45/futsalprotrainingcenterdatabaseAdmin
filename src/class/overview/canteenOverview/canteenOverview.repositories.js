const com = require('../../../config/com');
const AppError = require('../../../utils/AppError');
const logger = require('../../../utils/logger');


exports.ShowCanteenOverview = async ()=>{

    const [canteen_order] = await com.pool.query('select sum(amount) as total from canteen_order');

    if(!canteen_order)throw new AppError('Failed to get canteen order',500);

    const [today] = await com.pool.query('select count(*) as today from canteen_order WHERE DATE(create_at) = CURDATE()');

    if(!today)throw new AppError('Failed to get total order',500);

    const [tot_menu] = await com.pool.query(' select cp.id,cp.name,count(*) as total_count from canteen_order_item coi join canteen_products cp on coi.canteen_product_id = cp.id group by cp.id,cp.name order by total_count desc limit 1');

    if(!tot_menu)throw new AppError('Failed to get total menu',500);

    const [today_order_price] = await com.pool.query('select sum(amount) as total from canteen_order where DATE(create_at) = CURDATE()');

    if(!today_order_price)throw new AppError('Failed to get today order price',500);

    const [order_trend] = await com.pool.query(`
                SELECT 
            YEAR(create_at) AS year,
            MONTH(create_at) AS month_num,
            MONTHNAME(create_at) AS month_name,
            COUNT(*) AS total_orders
        FROM canteen_order
        GROUP BY 
            YEAR(create_at),
            MONTH(create_at),
            MONTHNAME(create_at)
        ORDER BY year, month_num
        `);

    const total_order = canteen_order[0].total || 0;
    const today_order = today[0].today || 0;
    const total_menu = tot_menu[0].name || 'No Top Menu';
    const today_revenue = today_order_price[0].total || 0;
    const canteen_order_trend = order_trend || [];
    
    console.log(tot_menu);

    return{
        total_order,
        today_order,
        total_menu,
        today_revenue,
        canteen_order_trend
    }
} 