const assert=require('./asset');
const sql=require('../Dao/basic_method');
(async ()=>{
    let username='xiaojue';
    let password='123';
    let device_id='543';
    let wallet_name=await assert.createAccount('xiaojue');
    console.log(JSON.stringify(wallet_name));
    sql.insertUser(username,password,device_id,JSON.stringify(wallet_name));
})();
