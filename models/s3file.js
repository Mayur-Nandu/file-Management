const connection = require('../connection/MongooseConnection');
const mongoose = require('mongoose');

//simple schema
const s3FileSchema = new mongoose.Schema({
  LocationUrl: {
    type:String,
    required:true,
    unique : true
 },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  }
});

const S3file = connection.model('s3file', s3FileSchema);

module.exports = S3file; 