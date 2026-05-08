const repo = require('./booking.repositories');


class BookingService{

    async addSportType(name){

        const result = await repo.addSportType(name);

        return result;

    }

    async showSportType(){
        
        const result = await repo.showSportType();

        return result;

    }

    async updateSportType(id,name){

        const result = await repo.updateSportType(id,name);

        return result;

    }

    async deleteSportType(id){

        const result = await repo.deleteSportType(id);

        return result;

    }


    async addCourtName(name){

        const result = await repo.addCourtName(name);

        return result;

    }

    async showCourtName(){

        const result = await repo.showCourtName();

        return result;

    }

    async updateCourtName(id,name){

        const result = await repo.updateCourtName(id,name);

        return result;

    }

    async deleteCourtName(id){

        const result = await repo.deleteCourtName(id);

        return result;

    }


    async addStartTime(time){

        const result = await repo.addStartTime(time);

        return result;

    }


    async showStartTime(){

        const result = await repo.showStartTime();

        return result;

    }

    async updateStartTime(id,time){

        const result = await repo.updateStartTime(id,time);

        return result;

    }

    async deleteStartTime(id){

        const result =await repo.deleteStartTime(id);

        return result;

    }
    

}

module.exports = new BookingService();