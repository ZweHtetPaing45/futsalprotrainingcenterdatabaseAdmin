const repo = require('./venueManagement.repositories');


class VenueService{


    async NewVenue(name,price,file,available){

        const result = await repo.NewVenue(name,price,file,available);

        return result;

    }

    async NewEquipment(venue_id,product_name,rental_price,qty_total){

        const result = await repo.NewEquipment(venue_id,product_name,rental_price,qty_total);

        return result;

    }

    async NewRule(venue_id,name,description){

        const result = await repo.NewRule(venue_id,name,description);

        return result;

    }

    async NewService(venue_id,name){

        const result = await repo.NewService(venue_id,name);

        return result;

    }

    async NewCourt(venue_id,court_name,hourly_price,open_at,close_at,about_court){

        const result = await repo.NewCourt(venue_id,court_name,hourly_price,open_at,close_at,about_court);

        return result;

    }

    async NewCourt_time_slot(court_id,start_time,end_time){

        const result = await repo.NewCourt_time_slot(court_id,start_time,end_time);

        return result;

    }

    async NewCourt_gallery(court_id,file){

        const result = await repo.NewCourt_gallery(court_id,file);

        return result;

    }

    async NewPros(court_id,name){

        const result = await repo.NewPros(court_id,name);

        return result;

    }

    async NewCons(court_id,name){

        const result = await repo.NewCons(court_id,name);

        return result;

    }

    async ShowVenue(){

        const result = await repo.ShowVenue();

        return result;

    }

    // async ShowEquipment(id){

    //     const result = await repo.ShowEquipment(id);

    //     return result;

    // }

    // async ShowRule(id){

    //     const result = await repo.ShowRule(id);

    //     return result;

    // }

    // async ShowService(id){

    //     const result = await repo.ShowService(id);

    //     return result;

    // }

    async ShowCourt(id){
        
        const result = await repo.ShowCourt(id);

        return result;

    }

    async DeleteVenue(id){

        const result = await repo.DeleteVenue(id);

        return result;

    }

}

module.exports = new VenueService();