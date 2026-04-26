const AppError = require("../../../utils/AppError");
const logger = require("../../../utils/logger");
const com = require('../../../config/com');


exports.NewStaff = async (name,email,password,role)=>{

    console.log('Name',name);
    console.log('Email',email);
    console.log('Password',password);
    console.log('Role',role);

    const [findrole] = await com.pool.query('select id from roles where role_name = ?',[role]);

    if(findrole.length === 0)throw new AppError('Role not found',404);

    console.log(findrole[0].id);

    const role_id =  findrole[0].id;

    const addStaff = await com.pool.query('insert into staff (name,email,password,role_id) values (?,?,?,?)',[name,email,password,role_id]);

    if(!addStaff)throw new AppError('Failed to add new staff',500);

    return true;

}

exports.deleteStaff = async (id)=>{

    const [deleteStaff] = await com.pool.query('delete from staff where id = ?',[id]);

    if(deleteStaff.affectedRows === 0){
        // console.log('No staff found with that id');
        return false;
    }

    return true;
}

exports.showStaff = async ()=>{

    const [showStaff] = await com.pool.query('select * from staff');

    if(!showStaff)throw new AppError('Failed to show staff',500);

    if(showStaff.length === 0)throw new AppError('No staff found',404);

    return showStaff;

} 