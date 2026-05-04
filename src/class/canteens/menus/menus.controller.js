const service = require('./menus.services');

class menuController{

    async addMenu(req,res,next){

        try{

            const file = req.file;

            if(!file){
                throw new AppError('Please fill all the fields', 400);
            }

            const {name,price,available,category_name} = req.body;

            if(!name || !price || !available || !category_name){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.addMenu(name,price,available,file,category_name);

            res.status(201).json({
                status: 'success',
                message: 'Menu added successfully',
                data: result
            });


        }catch(error){
            next(error);
        }

    }

    async addMenuCategory(req,res,next){

        try{

            const {name} = req.body;

            if(!name){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.addMenuCategory(name);

            res.status(201).json({
                status: 'success',
                message: 'Menu category added successfully',
                data: result
            });
        
        }catch(error){
            next(error);
        }

    }

    async updateMenuCategory(req,res,next){

        try{

            const id = req.params.id;

            const {name} = req.body;

            if(!id || !name){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.updateMenuCategory(id,name);

            res.status(201).json({
                status: 'success',
                message: 'Menu category updated successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }

    async updateMenu(req,res,next){

        try{

            const id = req.params.id;

            const file = req.file;

            const {name,price,available,category_name} = req.body;

            const result = await service.updateMenu(id,name,price,available,file,category_name);

            res.status(201).json({
                status: 'success',
                message: 'Menu updated successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }

    async deleteMenu(req,res,next){
        try{

            const id = req.params.id;

            if(!id){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.deleteMenu(id);

            res.status(201).json({
                status: 'success',
                message: 'Menu deleted successfully',
                data: result
            });

        }catch(error){
            next(error);
        }
    }

    async deleteMenuCategory(req,res,next){

        try{

            const id = req.params.id;

            if(!id){
                throw new AppError('Please fill all the fields', 400);
            }

            const result = await service.deleteMenuCategory(id);

            res.status(201).json({
                status: 'success',
                message: 'Menu category deleted successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }

    async showMenu(req,res,next){

        try{

            const result = await service.showMenu();

            if(!result){
                throw new AppError('Failed to show menu',500);
            }

            res.status(200).json({
                status: 'success',
                message: 'Menu shown successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }

    async showMenuCategory(req,res,next){

        try{

            const result = await service.showMenuCategory();

            if(!result){
                throw new AppError('Failed to show menu category',500);
            }

            res.status(200).json({
                status: 'success',
                message: 'Menu category shown successfully',
                data: result
            });

        }catch(error){
            next(error);
        }

    }

}

module.exports = new menuController();