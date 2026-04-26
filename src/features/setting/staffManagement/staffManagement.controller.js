const service = require('./staffManagement.service');


class StaffManagementController {

    async NewStaff(req,res,next){
        try{

        const {name,email,password,role} = req.body;

        if(!name || !email || !password || !role){
            return res.status(400).json({message:"All fields are required"});
        }

        const result = await service.newStaff(name,email,password,role);

        res.status(201).json({
            message: 'New staff added successfully',
            data: result
        })

        }catch(error){
            next(error);
        }
    }


    async deleteStaff(req,res,next){
        try{

            const id = req.params.id;

            if(!id){
                return res.status(400).json({message:"Staff ID is required"});
            }

            const result = await service.deleteStaff(id);

            if(!result){
                return res.status(404).json({message:"Staff not found"});
            }

            res.status(200).json({
                message: 'Staff deleted successfully',
                data: result
            })

        }catch(error){
            next(error);
        }
    }

    async showStaff(req,res,next){
        try{

            const result = await service.showStaff();

            if(!result){
                return res.status(404).json({message:"No staff found"});
            }

            res.status(200).json({
                message: 'Staff shown successfully',
                data: result
            });

        }catch(error){
            next(error);
        }
    }
}

module.exports = new StaffManagementController();