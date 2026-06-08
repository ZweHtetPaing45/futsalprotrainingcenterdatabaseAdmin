const com = require('../../config/com');

exports.findEmailData = async (email)=>{
    
    const [findEmail] = await com.pool.query(`
            SELECT
            s.id,
            s.name,
            s.email,
            s.status,
            s.password
        FROM staff s
        JOIN roles r ON s.role_id = r.id
        WHERE r.role_name = 'admin' and email = ?
        `,[email]);

    if(findEmail.length === 0)return null;

    // console.log(findEmail[0]);

    return findEmail[0];
    
}

