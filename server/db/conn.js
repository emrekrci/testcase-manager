const {MongoClient} = require('mongodb');
const connectionString = process.env.BASE_URI;
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    connectToServer : function (callback) {
        client.connect(function (err, db) {
            if(err || !db){
                return callback(err);
            }

            dbConnection = db.db('sample_testcase_manager');
            console.log('Successfully connected to MongoDB');

            return callback();
        });
    }, 

    getDB: function(){
        return dbConnection;
    },
};