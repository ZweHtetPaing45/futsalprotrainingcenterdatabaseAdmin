const com = require('../../config/com');

exports.findEmailData = async (email)=>{
    
    const [findEmail] = await com.pool.query('select name,email,role_id,status,password from staff where email = ?',[email]);

    if(findEmail.length === 0)return null;

    // console.log(findEmail[0]);

    return findEmail[0];
    
}