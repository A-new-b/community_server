let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  (async ()=>{
    res.render('index', { title: 'Express' });
  })();
});
router.post('/', function(req, res, next) {
  res.send(req.toString());
  console.log(req);
});
module.exports = router;
