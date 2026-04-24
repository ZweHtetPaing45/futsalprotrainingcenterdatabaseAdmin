const AppError = require("../../utils/AppError");
const logger = require("../../utils/logger");
const com = require('../../config/com');



exports.showCustomerData = async ()=>{

    const [customerData] = await com.pool.query('select id,name,address,phone,email from createuser;')

    if(customerData.length === 0)throw new AppError('No customer data found',404);

    return customerData;
}