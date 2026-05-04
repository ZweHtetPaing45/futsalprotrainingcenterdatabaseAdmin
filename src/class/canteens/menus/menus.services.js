const repo = require('./menus.repositores');


class menuService{


    async showMenu(){

        const result = await repo.showMenu();

        if(!result)throw new AppError('Failed to show menu',500);

        return result;

    }

    async showMenuCategory(){

        const result = await repo.showMenuCategory();

        if(!result)throw new AppError('Failed to show menu category',500);

        return result;

    }

    async addMenu(name,price,available,file,category_name){

        const result = await repo.addMenu(name,price,available,file,category_name);

        return result;

    }

    async addMenuCategory(name){

        const result = await repo.addMenuCategory(name);

        if(!result)throw new AppError('Failed to create menu category',500);

        return result;

    }

    async updateMenuCategory(id,name){

        const result = await repo.updateMenuCategory(id,name);

        if(!result)throw new AppError('Failed to update menu category',404);

        return result;

    }

    async updateMenu(id,name,price,available,file,category_name){

        const result = await repo.updateMenu(id,name,price,available,file,category_name);

        if(!result)throw new AppError('Failed to update menu',404);

        return result;

    }

    async deleteMenu(id){
        
        const result = await repo.deleteMenu(id);

        return result;

    }

    async deleteMenuCategory(id){
        
        const result = await repo.deleteMenuCategory(id);

        return result;

    }

}

module.exports = new menuService();