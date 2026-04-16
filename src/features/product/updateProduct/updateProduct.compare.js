const service = require('./updateProduct.services');

exports.mergeProductData = async (userinput) => {

    // const finalData = {};

    // for (let key in helperResult) {

    //     if (key === 'tag') {
    //         finalData[key] =
    //             (userinput.tags !== undefined && userinput.tags !== '')
    //             ? userinput.tags
    //             : helperResult[key];
    //         continue;
    //     }

    //     const userValue = userinput[key];

    //     if (userValue !== undefined && userValue !== '') {
    //         finalData[key] = userValue;
    //     } else {
    //         finalData[key] = helperResult[key];
    //     }
    // }

    // // 🔥 image override (YOUR RULE)
    // if (userinput.imageUrl && userinput.publicId) {
    //     finalData.image_url = userinput.imageUrl;
    //     finalData.public_id = userinput.publicId;
    // }

        if(userinput.image_url !== helperResult.image_url){
            
            console.log('Compare');
        await service.deleteImage(helperResult.public_id);

        }


    return finalData;
};