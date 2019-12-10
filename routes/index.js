let express = require('express');
let router = express.Router();
let path = require('path');
let  multer = require('multer');
const crypto = require('crypto');
let mongodb = require('mongodb');
let mongoClient = mongodb.MongoClient;
let mongoose = require('mongoose');
// const binary = mongodb.Binary
const mongoURI='mongodb://localhost:27017/';
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const conn = mongoose.createConnection(mongoURI);
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);  
  gfs.collection('uploads');
});


// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file  : (req, file) => {
    return new Promise((resolve, reject) => {
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });



router.get('/', function(req, res, next) {
      console.log(__dirname + '/index.html');
      res.sendFile(path.join(__dirname + '/index.html'));
});

router.post('/upload', upload.single('photo'),function(req, res, next){
  res.redirect('/');
});


module.exports = router;
