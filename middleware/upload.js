let  multer = require('multer');
let mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const mongoURI='mongodb://localhost:27017/';
const GridFsStorage = require('multer-gridfs-storage');
let conn = require('../connection/MongooseConnection');

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
        const ownerid=req.body.email;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
          metadata: req.user.email
        };
        resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });
module.exports = upload;
