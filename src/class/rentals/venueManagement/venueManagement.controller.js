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

            const file = req.file;

            if(!venue_id || !product_name || !rental_price || !qty_total || !file){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.NewEquipment(venue_id,product_name,rental_price,qty_total,file);

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

            const {venue_id,court_name,hourly_price,open_at,close_at,about_court} = req.body;

            if(!venue_id || !court_name || !hourly_price || !open_at || !close_at || !about_court){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.NewCourt(venue_id,court_name,hourly_price,open_at,close_at,about_court);

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

}

module.exports = new VenueController();