const assert=require('./asset');

(async ()=>{
    let {wallet_name,hash}=await assert.createAccount('jue5');
    console.log(JSON.stringify(wallet_name));
    let {asserts,hash_2}=await assert.addAssert(wallet_name);
    console.log(asserts);
    let info=await assert.readAssert(asserts,hash_2);
    console.log(info);
})();

