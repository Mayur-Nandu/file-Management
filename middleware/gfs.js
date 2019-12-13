let conn = require('../connection/MongooseConnection');
const Grid = require('gridfs-stream');
const mongoose= require('mongoose');


let gfs;
 conn.once('open', async () => {
      // Init stream
    //   console.log( conn.db.collection('uploads'));
    //   console.log("gfs " + gfs)
    gfs = await Grid(conn.db, mongoose.mongo);  
    gfs.collection('uploads')
});
// console.log(conn.db)
//let gfs = null
module.exports = gfs;