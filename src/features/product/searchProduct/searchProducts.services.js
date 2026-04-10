const AppError = require('../../../utils/AppError');
const repo = require('./searchProducts.repositories');


class searchProductServices{


    async searchProduct(name){

        //Firstesarch မှာ name နဲစစ်တယ် မတွေ့ခဲ့ရင် name မှာ စကားစုဘယ်နှစ်စုရှိလဲကြည့်မယ် 
        // 1 ခုထက်ပိုရင် split နဲ့ခွဲပြီးစစ်မယ် 1 ခုထဲကိုမတွေ့တာဆိုရင်
        // Can not found product

        //Name တစ်ခုထည်းနဲ့တွေ့ရင် return ပြန်မယ်
        //မတွေ့ရင် name ကို  split လုပ် တစ်ခုထက်ပိုရင်ထပ်စစ်
        //တစ်ခုထဲကိုမတွေ့တာဆို can not found

        const splitName = name.split(' ');

        console.log(splitName);

        //First Search Name condition using one String 
        const data = await repo.FirstsearchProduct(name);

        //စကားစု ကတစ်ခုထဲ ဆို တစ်ခုထဲကိုရှာမတွေ့မှ const data ထဲမှာလဲ Data မရှိနေမှ
        if(data.length === 0 && splitName.length === 1){
            return [];
        }

        if(data.length > 0){

            console.log('first');

            return data;

        }else if(splitName.length === 2){

            console.log('second');

            //Second Search Name condition using split condition
            const data = await repo.SecondsearchProduct(name);
            return data;

         }else if(splitName.length === 3){

            console.log('third');

            const data = await repo.ThirdsearchProduct(name);

            return data;

         }
        //else{
        //     return "Can not Found Product";
        // }
    }
}

module.exports = new searchProductServices();