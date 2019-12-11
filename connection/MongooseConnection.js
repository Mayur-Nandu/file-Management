const mongoose= require('mongoose');
const config = require('config');
const options = { useUnifiedTopology: true , useNewUrlParser: true, useCreateIndex: true } ;

const dboperations = (function(){
    function connect(){
        return mongoose.createConnection(config.get('mongoURI'), options);
    }

    return {
        getConnection: function () {
            var instance = connect();
            return instance;
        }
    }
})();

module.exports = dboperations.getConnection();