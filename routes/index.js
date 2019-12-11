let express = require('express');
let router = express.Router();
let path = require('path');
let upload = require('../middleware/upload');
const conn = require('../connection/MongooseConnection');

router.get('/', function(req, res, next) {
      console.log(__dirname + '/index.html');
      collection = "uploads.files";
      res.sendFile(path.join(__dirname + '/index.html'));
});

router.post('/upload', upload.single('photo'),function(req, res, next){
  res.redirect('/');
});


router.get('/')
module.exports = router;
