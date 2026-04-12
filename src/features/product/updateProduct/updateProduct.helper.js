let storagedata;

exports.updateProductData = (product)=>{

    storagedata = product;

    // console.log(storagedata);

    return product;

}

exports.insertData = ()=>{
    const data = storagedata[0];

    return data;
}