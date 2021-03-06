const config = require('../conf/conf').config;
const mysql = require('mysql');

const pool = mysql.createPool(config);

exports.insertUser=(username,password,device_id,account)=>{
    pool.getConnection(function(err, connection){
        connection.query( "insert into users(user_name,user_password,device_id,account) values(?,?,?,?)",[username,password,device_id,account],function(err, rows){
            if(err) {
                throw err;
            }else{
                console.log( rows );
            }
        });
        connection.release();
    });
};

exports.selectUser=(username,password,callback)=>{
    pool.getConnection(function(err, connection){
        connection.query( "select * from users where user_name = ? and user_password= ?",[username,password],function(err,vals,fields){
            if(err) {
                callback(err,null)
            }else{
                callback(vals[0],fields)
            }
        });
        connection.release();
    });
};

exports.selectUserToken=(device_id,callback)=>{
    pool.getConnection(function(err, connection){
        connection.query( "select * from users where device_id = ?",[device_id],function(err,vals,fields){
            if(err) {
                callback(err,null)
            }else{
                callback(vals[0],fields)
            }
        });
        connection.release();
    });
};

exports.insertAsset=(device_id,address,hash,callback)=>{
    pool.getConnection(function(err, connection){
        connection.query( "insert into asset(device_id,address,hash) values(?,?,?)",[device_id,address,hash],function(err,vals,fields){
            if(err) {
                callback(err,null);
            }else{
                callback(vals[0],fields);
            }
        });
        connection.release();
    });
};

exports.selectAsset=(device_id,callback)=>{
    pool.getConnection(function(err, connection){
        connection.query( "select * from asset where device_id= ?",[device_id],function(err, vals,fields){
            if(err) {
                console.log(err);
                callback(err,null)
            }else{
                callback(vals,fields);
            }
        });
        connection.release();
    });
};

