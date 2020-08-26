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

exports.insertAssert=(device_id,address,callback)=>{
    pool.getConnection(function(err, connection){
        connection.query( "insert into assert(device_id,address) values(?,?)",[device_id,address],function(err,vals,fields){
            if(err) {
                callback(err,null);
            }else{
                callback(vals[0],fields);
            }
        });
        connection.release();
    });
};

exports.selectAssert=(device_id)=>{
    pool.getConnection(function(err, connection){
        connection.query( "select * from assert where device_id= ?",[device_id],function(err, rows){
            if(err) {
                throw err;
            }else{
                console.log( rows[0] );
            }
        });
        connection.release();
    });
};

