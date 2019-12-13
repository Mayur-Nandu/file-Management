let  multer = require('multer');
const config = require('config');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose= require('mongoose');
const conn = require('../connection/MongooseConnection');

let gfs;
 conn.once('open',  () => {
    gfs =  Grid(conn.db, mongoose.mongo);  
    gfs.collection('uploads')
})

// Create storage engine
const storage = new GridFsStorage({
  url: config.get('mongoURI'),
  file  : (req, file) => {
    return new Promise((resolve, reject) => {
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
          metadata: req.user.email
        };
        resolve(fileInfo);
    });
  }
});



const UploadWithStorage = multer({ storage });
const  Upload= multer();
// module.exports = UploadWithStorage;

module.exports = {
  Upload,
  UploadWithStorage
}
