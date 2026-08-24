const AppError = require('../../../utils/AppError');
const walkInService = require('./walk-in.service');



class WalkInController{

    
    async addingWalkIn(req,res,next){

        try{
            const {court_name,daily_price,capacity,open_at,close_at} = req.body;

        if(!court_name || !daily_price || !capacity || !open_at || !close_at)throw new AppError("Enter walk in data",400);

        const result = await walkInService.addWalkIn(court_name,daily_price,capacity,open_at,close_at);

        res.status(201).json({
            message : "Create walk in successfully",
            result
        });
        }catch(error){
            next(error);
        }

    }

    async addbookingWalkIn(req,res,next){

        try{
            const file = req.file;

        const {walk_in_id,payment_method,vanue_id,court_id,name,phone,date,items,department} = req.body;

        if(!walk_in_id || !vanue_id || !court_id || !name || !phone || !date)throw new AppError("Please fill all the fields",500);

        const result = await walkInService.bookingWalkIn(walk_in_id,payment_method,vanue_id,court_id,name,phone,date,items,file,department);

        res.status(201).json({
            message : "Booking walk in successfully",
            result
        });
        }catch(error){
            next(error);
        }

    }

    async allWalkInList(req,res,next){

        try{

            const result = await walkInService.allWalkInList();

            res.status(200).json({
                message : "All list booking",
                result
            });

        }catch(error){
            next(error);
        }

    }

    async mobileAllWalkInBookingList(req,res,next){

        try{

            const result = await walkInService.mobileAllWalkInBookingList();

            res.status(200).json({
                message : "Mobile All list booking",
                result
            });

        }catch(error){
            next(error);
        }

    }

    async allCourtWalkIn(req,res,next){

        try{

            const result = await walkInService.allCourtWalkIn();

            res.status(200).json({
                message : "All list court walk in",
                result
            });

        }catch(error){
            next(error);
        }

    }

    async updateWalkIn(req,res,next){

        try{
        
            const walk_in_id = req.params.walk_in_id;

        const {daily_price,capacity,open_at,close_at} = req.body;

        if(!walk_in_id)throw new AppError("Enter Walk In id required",500);

        const result = await walkInService.updateWalkIn(daily_price,capacity,open_at,close_at,walk_in_id);

        res.status(201).json({
            message : "Update Walk In Successfully",
            result
        });

        }catch(error){
            next(error);
        }
        
    }


}


module.exports = new WalkInController();