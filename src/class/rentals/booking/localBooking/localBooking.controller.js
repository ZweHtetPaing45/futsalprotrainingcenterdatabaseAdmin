const service = require('./localBooking.service');
const AppError = require('../../../../utils/AppError');


class localBookingController{

    async AdminBooking(req,res,next){

        try{

            const {venue_id,court_id,payment_id,reciept_no,date,court_time_slot_ids,department,items} = req.body;

            const file = req.file;


            
            console.log('venue_id',venue_id);
            console.log('court_id',court_id);
            console.log('payment_id',payment_id);
            console.log('reciept_no',reciept_no);
            console.log('date',date);
            console.log('court_time_slot_ids',court_time_slot_ids);
            console.log('department',department);
            console.log('items',items);
            console.log('file',file);
            

            if(!venue_id || !court_id || !payment_id || !reciept_no || !date || !court_time_slot_ids || !file){
                throw new AppError('Please fill all the fields', 400);
            }


            const result = await service.AdminBooking(venue_id,court_id,payment_id,reciept_no,date,court_time_slot_ids,department,items,file);

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Admin Booking added successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Admin Booking not added',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async ShowLocalBookingData(req,res,next){

        try{

            const result = await service.ShowLocalBookingData();

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Admin Booking added successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Admin Booking not added',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async DeleteLocalBooking(req,res,next){

        try{

            const id = req.params.id;

            const result = await service.DeleteLocalBooking(id);

             if(result){
                res.status(201).json({
                    success: true,
                    message: 'Admin Booking Delete successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Admin Booking not delete',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

}

module.exports = new localBookingController();