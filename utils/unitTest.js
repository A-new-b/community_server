const assert=require('./asset');

(async ()=>{
    // let wallet_name=await assert.createAccount('jue7');
    // let name_json=wallet_name.toJSON();
    // console.log(typeof(wallet_name.toJSON()));
    // console.log(JSON.stringify(name_json));
    // let test=JSON.stringify(name_json);
    // console.log(test);
    // const info_s={
    //     "blood_sugar":"1",
    //     "blood_pressure_s":"1",
    //     "blood_pressure_d":"1",
    //     "time":"1"
    // };
    // let {assetAddress,hash}=await assert.addAssert(info_s,test);
    // console.log(assetAddress);
    let assetAddress='zjdeiHBusNMsqQtDQxc1HvnDZg3xFY4S434F';
    let hash ='16F89348E758BC369EE2B05C415B46314842ABA87AFE3F56C063C3EE637A274E';
    let info=await assert.readAssert(assetAddress,hash);
    console.log(info);
})();

