const service = require('./trainingOverview.service');

class TrainingOverviewController{

    async ShowTrainingOverview(req,res,next){

        try{

            const result = await service.ShowTrainingOverview();

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Training overview data fetched successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Training overview data not fetched',
                    data: result
                });
            }

        }catch(error){
            next(error);
        }

    }

    async TrainingStudentOverview(req,res,next){

        try{

            const result = await service.TrainingStudentOverview();

            if(result){
                res.status(201).json({
                    success: true,
                    message: 'Training overview data fetched successfully',
                    data: result
                });
            }else{
                res.status(400).json({
                    success: false,
                    message: 'Training overview data not fetched',
                    data: result
                });
            }


        }catch(error){
            next(error);
        }
    }

}

module.exports = new TrainingOverviewController();