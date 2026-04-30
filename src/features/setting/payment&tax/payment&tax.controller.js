const service = require('./payment&tax.services');


class paymentandtaxController{


    async addingPayment(req,res,next){

        try{

            const file = req.file;

            if(!file){
                return res.status(400).json({
                    message: 'Enter payment Image'
                });
            }

            const {payment_method,payment_name,payment_number} = req.body;

            if(!payment_method || !payment_name || !payment_number){
                return res.status(400).json({
                    message: "Enter payment full data"
                });
            }

            const result = await service.addingPayment(payment_method,payment_name,payment_number,file);

            if(result){
                res.status(201).json({
                    message: "adding payment successful",
                    result
                });
            }else{
                res.status(400).json({
                    message: "Adding payment Error",
                    result
                })
            }

        }catch(error){
            next(error);
        }

    }

    async updatePayment(req,res,next){
        try{

            const id = req.params.id;

            const file = req.file;

            const {payment_method,payment_name,payment_number} = req.body;

            const result = await service.updatePayment(id,payment_method,payment_name,payment_number,file);

            if(result){
                res.status(201).json({
                    message: "adding payment successful",
                    result
                });
            }else{
                res.status(400).json({
                    message: "Update paymentError",
                    result
                })
            }


        }catch(error){
            next(error);
        }
    }

    async deletePayment(req,res,next){
        try{

            const id = req.params.id;

            const result = await service.deletePayment(id);

            if(result){
                res.status(201).json({
                    message: "Delete payment successful",
                    result
                });
            }else{
                res.status(400).json({
                    message: "Delete payment Error",
                    result
                })
            }

        }catch(error){
            next(error);
        }
    }

    async showPayment(req,res,next){
        try{

            const result = await service.showPayment();

            if(result){
                res.status(201).json({
                    message: "Show payment successful",
                    result
                });
            }else{
                res.status(400).json({
                    message: "Show payment Error",
                    result
                })
            }

        }catch(error){
            next(error);
        }
    }


    async addingTax(req,res,next){

        try{

            const {tax} = req.body;

            if(!tax){
                return res.status(400).json({
                    message: "Enter tax"
                });
            }

            const result = await service.addingTax(tax);

            if(result){
                res.status(201).json({
                    message: "adding tax successful",
                    result
                });
            }else{
                res.status(400).json({
                    message: "Adding tax Error",
                    result
                })
            }

        }catch(error){
            next(error);
        }

    }

    async updateTax(req,res,next){
        try{

            const id = req.params.id;

            const {tax} = req.body;

            if(!tax){
                return res.status(400).json({
                    message: "Enter tax"
                });
            }

            const result = await service.updateTax(id,tax);

            if(result){
                res.status(201).json({
                    message: "adding tax successful",
                    result
                });
            }else{
                res.status(400).json({
                    message: "Update tax Error",
                    result
                })
            }

        }catch(error){
            next(error);
        }
    }

}

module.exports = new paymentandtaxController();