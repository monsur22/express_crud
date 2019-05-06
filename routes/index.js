var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var assert=require('assert'); 
var url = 'mongodb://localhost:27017/';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');

});
router.get('/test', function(req, res, next) {
  res.render('test');

});


router.get('/get-data', function(req, res, next) {
  mongo.connect(url, function (err, db) {
    if (err) throw err;
    var dbObject = db.db("myDB");
    dbObject.collection("user-data").find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.render('index', {
        items : result
      });
    });
});
  
});

// router.get('/get-data', function(req, res, next) {
//   var resultArray = [];
//   mongo.connect(url, function(err, db) {
//     assert.equal(null, err);
//     var cursor = db.collection('user-data').find();
//     cursor.forEach(function(doc, err) {
//       assert.equal(null, err);
//       resultArray.push(doc);
//     }, function() {
//       db.close();
//       res.render('index', {items: resultArray});
//     });
//   });
// });

router.post('/insert',function(req,res,next){
var item={
  title: req.body.title,
  content: req.body.content,
  author: req.body.author,
};
mongo.connect(url,function(err,db){
  assert.equal(null,err);
  var dbObject = db.db('myDB');//nahian
  dbObject.collection('user-data').insertOne(item,function(err,result){
  assert.equal(null,err);
  console.log('Item Insert');
  db.close();
  res.render('index',{items:resultArray});
  });

});
res.redirect('/');
});



router.post('/update',function(req,res,next){
  var item={
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  var id=req.body.id;
  mongo.connect(url,function(err,db){
    assert.equal(null,err);
    var dbObject = db.db('myDB');//nahian
    dbObject.collection('user-data').updateOne({"_id": ObjectID(id)},{$set:item},function(err,result){
    assert.equal(null,err);
    console.log('Item Update');
    db.close();
  
    });
  
  });
});

router.post('/delete',function(req,res,next){
  var id=req.body.id;
  mongo.connect(url,function(err,db){
    assert.equal(null,err);
    var dbObject = db.db('myDB');//nahian
    dbObject.collection('user-data').deleteOne({"_id": ObjectID(id)},function(err,result){
    assert.equal(null,err);
    console.log('Item delete');
    db.close();
  
    });
  
  });
});


module.exports = router;
