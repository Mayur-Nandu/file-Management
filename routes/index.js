let express = require('express');
let router = express.Router();
let upload= require('../middleware/upload');
let Upload= upload.Upload;
let UploadWithStorage= upload.UploadWithStorage;
const conn = require('../connection/MongooseConnection');
const auth = require('../middleware/auth');
const Grid = require('gridfs-stream');
const mongoose= require('mongoose');
const S3 = require('../connection/connectS3');
const S3File = require("../models/s3file");

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

router.post('/upload', auth, UploadWithStorage.single('photo'), function(req, res, next){
  console.log(req.file);
  res.status(200).send("file uploaded");
});

router.post('/uploadS3' ,auth, Upload.single('file'), (req, res, next) => {
  console.log(req.user.email);
  req.file.originalname = Date.now()+req.file.originalname ;
  var key = process.env.AWS_KEY + "/" + req.file.originalname;
 
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
   };

   S3.upload(params,(err, data)=>{
      if(err) {
        console.log("err by s3");
        console.log(err);
        res.status(400).send('Error Occured while uploading to S3');
      }
      if(data){
        console.log("successfully uploaded");
        // console.log(data);
        console.log(key);
        let s3File = new S3File({
          fileName:key,
          email:req.user.email
        })
        s3File.save();
        res.status(200).send(data);
      }
   }) 
})


router.get('/')
module.exports = router;
