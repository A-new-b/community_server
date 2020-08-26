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
        let token = jwt.sign({result}, secretKey, {
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
router.post('/createAccount',function (req,res,next) {
    (async ()=>{
        let body=req.body;
        console.log(req.body);
        try{

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
router.post('/information',);//获取列表信息api
module.exports = router;
