let express = require('express');
let router = express.Router();
let sql=require('../Dao/basic_method');
let block_method=require('../utils/asset');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../constant/constant');
let jwtAuth=require('./jwt');
router.use(jwtAuth);
// 路由中间件
router.use((req, res, next) => {
  // 任何路由信息都会执行这里面的语句
  console.log('this is a api request!');
  // 把它交给下一个中间件，注意中间件的注册顺序是按序执行
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  (async ()=>{
    res.render('index', { title: 'Express' });
  })();
});
router.post('/login', function(req, res, next) {
  (async ()=>{
    let body=req.body;
    console.log(req.body);
    const login_callback=(result,resolve)=>{
      if (resolve===null){
        res.status(500).json(
            {
              code:0,
              msg:'databases error'
            }
        )
      } else if (result===undefined){
        res.json(
            {
              code:0,
              msg:'帐号或密码错误'
            }
        )
      }
      else {
          let id=result.device_id;
        let token = jwt.sign({id}, secretKey, {
          expiresIn : 60 * 60 * 24 // 授权时效24小时
        });
        res.json(
            {
              code:1,
              msg:'登录成功',
              token:token
            }
        )
      }
    };
    sql.selectUser(body.username,body.password,login_callback);
  })();
});//登录api

router.post('/createAsset',function (req,res,next) {
    (async ()=>{
        let info=req.body;
        let token = req.user;
        // console.log(req.body);
        const asset_callback=(result,resolve)=>{
            if (resolve===null){
                console.log(result);
                res.status(500).json(
                    {
                        code:0,
                        msg:'databases error'
                    }
                )
            } else {
                res.json(
                    {
                        code:1,
                        msg:'创建成功',
                    }
                )
            }
        };

        try{
            if(token!==undefined)
            {
                const select_callback=async (result,resolve)=>{
                    if (resolve!==null &&result!==undefined)
                    {
                        console.log(info.blood_sugar);
                        const address=await block_method.addAssert(info,result.account);
                        sql.insertAssert(token.id,address.assetAddress,address.hash,asset_callback);
                    }
                    else {
                        await res.status(500).json(
                            {
                                code:0,
                                msg:'服务器错误'
                            }
                        )
                    }
                };
                sql.selectUserToken(token.id,select_callback);
            }
            else {
                await res.json({
                    code:0,
                    msg:'该功能暂不开放'
                })
            }
        }catch (e) {
            console.log(e);
            await res.status(500).json(
                {
                    code:0,
                    msg:'服务器错误'
                }
            )
        }
    })();
});//创建账户api
router.get('/information',function (req,res,next) {
    (async ()=>{
        let token = req.user;
        // console.log(req.body);
        const read_callback=async (result,resolve)=>{
            if (resolve===null){
                console.log(result);
                await res.status(500).json(
                    {
                        code:0,
                        msg:'databases error'
                    }
                )
            } else if (result===undefined){
                await res.json(
                    {
                        code:0,
                        msg:'该设备不存在'
                    }
                )
            } else {
                let list=[];
                for(let i=0;i<result.length;i++)
                {
                    let item = await block_method.readAssert(result[i].address,result[i].hash);
                    if (item.data.value!==undefined)
                    {
                        list.push(item.data.value)
                    }
                }
                await res.json(
                    {
                        code:1,
                        list:list
                    }
                )
            }
        };

        try{
            if(token!==undefined)
            {
                sql.selectAssert(token.id,read_callback);
            }
            else {
                await res.json({
                    code:0,
                    msg:'请先登录'
                })
            }
        }catch (e) {
            console.log(e);
            await res.status(500).json(
                {
                    code:0,
                    msg:'服务器错误'
                }
            )
        }
    })();
});//获取列表信息api
router.post('/upload',function (req,res,next) {
    (
        async ()=>{
            let username=req.body.username;
            let password=req.body.password;
            let info = req.body.info;

            const upload_callback=(result,resolve)=>{
                if (resolve===null){
                    console.log(result);
                    res.status(500).json(
                        {
                            code:0,
                            msg:'databases error'
                        }
                    )
                } else {
                    res.json(
                        {
                            code:1,
                            msg:'创建成功',
                        }
                    )
                }
            };
            const select_upload_callback=async (result,resolve)=>{
                if (resolve!==null &&result!==undefined)
                {
                    // console.log(info.blood_sugar);
                    const address=await block_method.addAssert(info,result.account);
                    sql.insertAssert(result.id,address.assetAddress,address.hash,upload_callback);
                }
                else {
                    await res.status(500).json(
                        {
                            code:0,
                            msg:'服务器错误'
                        }
                    )
                }
            };
            sql.selectUser(username,password,select_upload_callback);



        }
    )();
})
module.exports = router;
