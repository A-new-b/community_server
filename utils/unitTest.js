const assert=require('./asset');

(async ()=>{
    let wallet_name=await assert.createAccount('jue5');
    console.log(JSON.stringify(wallet_name));
    let {assetAddress,hash}=await assert.addAssert(wallet_name);
    console.log(assetAddress);
    let info=await assert.readAssert(assetAddress,hash);
    console.log(info);
})();

