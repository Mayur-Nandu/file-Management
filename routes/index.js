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

//configuring gfs
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

//get list of files uploaded by a particualar user
router.get('/getFiles', auth, function(req, res, next) {
      gfs.files.find({metadata : req.user.email}).toArray((err, files) =>{
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

//get indiviudual file
router.get('/getFile/:filename',function(req, res, next) {
  gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.filename) },(err, file) => {
     // Check if file
    //  console.log(file)
     if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // Check if image
    console.log(file)
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
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
          LocationUrl:data.Location,
          email:req.user.email
        })
        s3File.save();
        res.status(200).send(data);
      }
   }) 
})

router.post('/uploadIBM',(req,res,next)=>{
  
})

router.get('/getS3Files' , auth , (req, res, next) =>{
  console.log(req.user.email)
  S3File.find({email:req.user.email} , ((err, result) =>
  {
      if(err){
        console.log('error occured while retriving files from S3');
      }
      if(result){
        let urlArray=[];
        // console.log(result)
        result.map( resultObj=>{
          urlArray.push(resultObj.LocationUrl)
        })
        res.status(200).send(urlArray);
      }
      else{
        console.log('No Data found for this user');
        res.status(200).send('No files Found');
      }
  }))
});

module.exports = router;