var express = require('express');
var router = express.Router();
//const Content = require('../models/Content')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('newdiary', {title:'New Diary'});
  //console.log(req.body.content)
});

router.post('/',function(req, res, next){
  //console.log("working?")
  //const contents = new Content(x)
  //fs.writeFileSync('models/data.json',JSON.stringify(database,null,''));
  console.log(req.body.content)

  res.render('newdiary',{title: 'New Diary'})

});

module.exports = router;
