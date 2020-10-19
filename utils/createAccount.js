const asset=require('./asset');
const sql=require('../Dao/basic_method');
(async ()=>{
    let username='xiaojue2';
    let password='123';
    let device_id='5433';
    let wallet_name=await asset.createAccount('xiaojue2');
    console.log(JSON.stringify(wallet_name.toJSON));
    sql.insertUser(username,password,device_id,JSON.stringify(wallet_name));
})();
