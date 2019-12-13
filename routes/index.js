let express = require('express');
let router = express.Router();
let path = require('path');
let upload = require('../middleware/upload');
const conn = require('../connection/MongooseConnection');
const auth = require('../middleware/auth');
// const gfs =require('../middleware/gfs');
const Grid = require('gridfs-stream');
const mongoose= require('mongoose');


conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});


router.get('/getFiles', auth, function(req, res, next) {
      // console.log(__dirname + '/index.html');
      // collection = "uploads.files";
      // res.sendFile(path.join(__dirname + '/index.html'));
      console.log(req.user.email)
      gfs.files.find({metadata : 'mayur@mayur.com'}).toArray((err, files) =>{
        // if (err) return console.log(err);
        // // res.contentType('image/jpeg');
        // res.send(result)

        if (!files || files.length === 0) {
          res.send({ files: false });
        } else {
          files.map(file => {
            if (
              file.contentType === 'image/jpeg' ||
              file.contentType === 'image/png'
            ) {
              file.isImage = true;
            } else {
              file.isImage = false;
            }
          });
          res.send({ files: files });
    }
      }); 
});

router.post('/upload', auth, upload.single('photo'), function(req, res, next){
  console.log(req.file);
  res.status(200).send("file uploaded");
});


router.get('/')
module.exports = router;
