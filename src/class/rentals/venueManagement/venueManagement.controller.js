const service = require('./venueManagement.services');



class VenueController{

    async NewVenue(req,res,next){

        try{

            let {name,price,available} = req.body;

            const file = req.file;

            if(!name || !price || !file || !available){
                throw new AppError('Please fill all the fields', 400);
            }

            available = available === 'true' ? 1 : 0;

            console.log("name",name);
            console.log("price",price);
            console.log("available",available);
            console.log("file",file);

            const result = await service.NewVenue(name,price,file,available);

            if(result){
                
                res.status(201).json({
                    success: true,
                    message: 'Venue added successfully',
                    data: result
                });

            }else{
                res.status(400).json({
                    success: false,
                    message: 'Venue not added',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async NewEquipment(req,res,next){
        
        try{

            const {venue_id,product_name,rental_price,qty_total} = req.body;

            console.log("venue_id",venue_id);
            console.log("product_name",product_name);
            console.log("rental_price",rental_price);
            console.log("qty_total",qty_total);

            if(!venue_id || !product_name || !rental_price || !qty_total){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.NewEquipment(venue_id,product_name,rental_price,qty_total);
            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Equipment added successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Equipment not added',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async NewRule(req,res,next){

        try{

            const {venue_id,name,description} = req.body;

            if(!venue_id || !name || !description){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.NewRule(venue_id,name,description);

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Rule added successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Rule not added',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async NewService(req,res,next){

        try{

            const {venue_id,name} = req.body;

            if(!venue_id || !name){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.NewService(venue_id,name);

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Service added successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Service not added',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async NewCourt(req,res,next){

        try{

            let {venue_id,court_name,hourly_price,open_at,close_at,about_court,court_active} = req.body;

            if(!venue_id || !court_name || !hourly_price || !open_at || !close_at || !about_court || !court_active){
                throw new AppError('Please fill all the fields', 400);
            }

            court_active = court_active === 'true' ? 1 : 0;

            console.log("venue_id",venue_id);

            const result = await service.NewCourt(venue_id,court_name,hourly_price,open_at,close_at,about_court,court_active);

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Court added successfully',
                    data: result
                });

            }else{
                res.status(400).json({
                    success: false,
                    message: 'Court not added',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async NewCourt_time_slot(req,res,next){

        try{

            const {court_id,start_time,end_time} = req.body;

            if(!court_id || !start_time || !end_time){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.NewCourt_time_slot(court_id,start_time,end_time);

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Court time slot added successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Court time slot not added',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async NewCourt_gallery(req,res,next){

        try{

            const file = req.file;

            const {court_id} = req.body;

            if(!court_id || !file){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.NewCourt_gallery(court_id,file);

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Court gallery added successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Court gallery not added',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async NewPros(req,res,next){

        try{

            const {court_id,name} = req.body;

            if(!court_id || !name){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.NewPros(court_id,name);

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Pros added successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Pros not added',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async NewCons(req,res,next){

        try{

            const {court_id,name} = req.body;

            if(!court_id || !name){
               throw new AppError('Please fill all the fields', 400); 
            }

            const result = await service.NewCons(court_id,name);

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Pros added successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Pros not added',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async ShowVenue(req,res,next){

        try{

            const result = await service.ShowVenue();

            if(result){
                res.status(200).json({
                    success: true,
                    message: 'Venue shown successfully',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    // async ShowEquipment(req,res,next){
    //     try{

    //         const venue_id = req.params.id;

    //         const result = await service.ShowEquipment(venue_id);

    //         if(result){
    //             res.status(200).json({
    //                 success: true,
    //                 message: 'Equipment shown successfully',
    //                 data: result
    //             });
    //         }

    //     }catch(error){
    //         next(error);
    //     }
    // }

    // async ShowRule(req,res,next){
    //     try{

    //         const venue_id = req.params.id;

    //         const result = await service.ShowRule(venue_id);

    //         if(result){
    //             res.status(200).json({
    //                 success: true,
    //                 message: 'Rule shown successfully',
    //                 data: result
    //             });
    //         }

    //     }catch(error){
    //         next(error)
    //     }
    // }

    // async ShowService(req,res,next){
    //     try{

    //         const venue_id = req.params.id;

    //         const result = await service.ShowService(venue_id);
            
    //         if(result){
    //             res.status(200).json({
    //                 success: true,
    //                 message: 'Service shown successfully',
    //                 data: result
    //             });
    //         }

    //     }catch(error){
    //         next(error);
    //     }
    // }

    async ShowCourt(req,res,next){

        try{

            const venue_id = req.params.id;

            const result = await service.ShowCourt(venue_id);

            if(result){
                res.status(200).json({
                    success: true,
                    message: 'Court shown successfully',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async DeleteVenue(req,res,next){

        try{

            const id = req.params.id;
    
            const result = await service.DeleteVenue(id);

            if(result){
                res.status(200).json({
                    success: true,
                    message: 'Venue deleted successfully',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async RemainBookingTimeSlot(req,res,next){

        try{

            const court_id = req.params.court_id;
            const date = req.params.date;

            const result = await service.RemainBookingTimeSlot(court_id,date);

            if(result){
                res.status(200).json({
                    success: true,
                    message: 'Remain booking time slot shown successfully',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async UpdateCourtTrueOrFalse(req,res,next){

        try{

            let court_id = req.params.court_id;
            let status = req.params.status;

            // console.log("status",status);
            // console.log("court_id",court_id);

            status = status === 'true' ? 1 : 0;

            console.log("status",status);

            const result = await service.UpdateCourtTrueOrFalse(court_id,status);

            if(result){
                res.status(200).json({
                    success: true,
                    message: 'Court status updated successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Court status not updated',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async AllShowCourt(req,res,next){

        try{

            const result = await service.AllShowCourt();

            if(result){
                res.status(200).json({
                    success: true,
                    message: 'All court shown successfully',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async updateVenue(req,res,next){

        try{

            const id = req.params.id;

            const {venue_name,price,available} = req.body;

            const file = req.file;

            console.log("id",id);
            console.log("venue_name",venue_name);
            console.log("price",price);
            console.log("available",available);
            console.log("file",file);

            // if(!venue_name || !price || !file || !available || !id){
            //     throw new AppError('Please fill all the fields', 400);
            // }

            const result = await service.updateVenue(id,venue_name,price,file,available);

            if(result){
                res.status(200).json({
                    success: true,
                    message: 'Venue updated successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Venue not updated',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async DeletePros(req,res,next){

        try{

            const pro_id = req.params.pro_id;

            const result = await service.deletePro(pro_id);
            
            if(result){
                res.status(200).json({
                    success: true,
                    message: 'Pros deleted successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Pros not deleted',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async DeleteCons(req,res,next){

        try{

            const con_id = req.params.con_id;

            const result = await service.deleteCon(con_id);

            if(result){
                res.status(200).json({
                    success: true,
                    message: 'Cons deleted successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Cons not deleted',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async DeleteCourtTimeSlot(req,res,next){

        try{

            const slot_id = req.params.slot_id;

            const result = await service.DeleteCourtTimeSlot(slot_id);

            if(result){
                res.status(200).json({
                    success: true,
                    message: 'Court time slot deleted successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Court time slot not deleted',
                    data: result
                });
            }


        }catch(error){
            next(error);
        }

    }

    async DeleteService(req,res,next){

        try{

            const service_id = req.params.service_id;

            const result = await service.DeleteService(service_id);

            if(result){
                res.status(200).json({
                    success: true,
                    message: 'Service deleted successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Service not deleted',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async DeleteRule(req,res,next){

        try{

            const rule_id = req.params.rule_id;

            const result = await service.DeleteRule(rule_id);

            if(result){
                res.status(200).json({
                    success: true,
                    message: 'Rule deleted successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Rule not deleted',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async DeleteEquipment(req,res,next){

        try{

            const equipment_id = req.params.equipment_id;

            const result = await service.DeleteEquipment(equipment_id);

            if(result){
                res.status(200).json({
                    success: true,
                    message: 'Equipment deleted successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Equipment not deleted',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async updateEquipment(req,res,next){

        try{

            const {product_name,rental_price,qty_total} = req.body;

            const equipment_id = req.params.equipmentId;

            const result = await service.updateEquipment(equipment_id,product_name,rental_price,qty_total);

            res.status(201).json({
                message: "Equipment Update",
                result
            })

        }catch(error){
            next(error);
        }

    }

}

module.exports = new VenueController();