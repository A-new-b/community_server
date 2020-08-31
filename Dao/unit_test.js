const module_S=require("./basic_method");


// module_S.selectUser('xiaoming','123',function (resolve,result) {
// console.log(resolve.user_name);
// console.log(result);
// });

// const insert_user_result=module_S.insertUser('xiaoli','123','123457','123');

const result=module_S.selectUserToken('123',function (resolve,result) {
        console.log(resolve.user_name);
        console.log(result);
    }
);

// const insert_asset_result=module_S.insertAsset('123','money');

// const select_asset_result=module_S.selectAsset('123');

console.log(result);