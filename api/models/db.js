const MongoClient = require('mongodb').MongoClient;
const MONGOLAB_URI = process.env.MONGOLAB_URI;

const history = {
    get: function() {
        return new Promise ((resolve, reject) => {
            MongoClient.connect(MONGOLAB_URI, (err, db) => {
                if (err) return console.log('Unable to connect to mongoDB server. Error: ', err);
                db.collection('history')
                .find()
                .limit(10)
                .sort({timestamp: -1})
                .toArray((err, data) => {
                    db.close();
                    resolve(data);
                });
            });
        });
    },
    push: function(query) {
        MongoClient.connect(MONGOLAB_URI, (err, db) => {
            if (err) return console.log('Unable to connect to mongoDB server. Error: ', err);
            const collection = db.collection('history');

            var data = Object.assign(query);
            data.timestamp = Date.now();

            collection.insertOne(data, () => {
                db.close()
            });
        });
    }
};

module.exports = history;
