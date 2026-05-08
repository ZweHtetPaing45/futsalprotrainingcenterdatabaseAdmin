const AppError = require('../../../utils/AppError');
const services = require('./booking.services');


class BookingController{


    async addSportType(req,res,next){

        try{

            const {name} = req.body;

            if(!name){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await services.addSportType(name);

            res.status(201).json({
                status: 'success',
                message: 'Sport type added successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }

    async showSportType(req,res,next){

        try{

            
            const result = await services.showSportType();

            res.status(201).json({
                status: 'success',
                message: 'Show sport type successfully',
                data: result
            });


        }catch(error){
            next(error);
        }

    }

    async updateSportType(req,res,next){

        try{

            const id = req.params.id;

            const{name} = req.body;

            if(!id || !name){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await services.updateSportType(id,name);

            res.status(201).json({
                status: 'success',
                message: 'Sport type updated successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }

    async deleteSportType(req,res,next){

        try{

            const id = req.params.id;

            if(!id){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await services.deleteSportType(id);

            res.status(201).json({
                status: 'success',
                message: 'Sport type deleted successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }


    async addCourtName(req,res,next){

        try{

            const {name} = req.body;

            if(!name){
                throw new AppError('Please fill all the fields', 400);
            }    

            const result = await services.addCourtName(name);

            res.status(201).json({
                status: 'success',
                message: 'Court name added successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }

    async showCourtName(req,res,next){

        try{

            const result = await services.showCourtName();

            res.status(201).json({
                status: 'success',
                message: 'Show court name successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }

    async updateCourtName(req,res,next){

        try{

            const id = req.params.id;

            const {name} = req.body;

            if(!id || !name){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await services.updateCourtName(id,name);

            res.status(201).json({
                status: 'success',
                message: 'Court name updated successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }

    async deleteCourtName(req,res,next){

        try{

            const id = req.params.id;

            if(!id){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await services.deleteCourtName(id);

            res.status(201).json({
                status: 'success',
                message: 'Court name deleted successfully',
                data: result
            });

        }catch(error){            
            next(error);
        }

    }

    async addStartTime(req,res,next){

        try{

            const {time} = req.body;

            if(!time){
                throw new AppError('Please fill all the fields', 400);
            }


            const result =await services.addStartTime(time);

            res.status(201).json({
                status: 'success',
                message: 'Start time added successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }

    async showStartTime(req,res,next){

        try{

            const result = await services.showStartTime();

            res.status(201).json({
                status: 'success',
                message: 'Show start time successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }

    async updateStartTime(req,res,next){

        try{

            const id = req.params.id;

            const {time} = req.body;

            const result = await services.updateStartTime(id,time);

            res.status(201).json({
                status: 'success',
                message: 'Start time updated successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }

    async deleteStartTime(req,res,next){

        try{

            const id = req.params.id;

            if(!id){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await services.deleteStartTime(id);

            res.status(201).json({
                status: 'success',
                message: 'Start time deleted successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }


}

module.exports = new BookingController();