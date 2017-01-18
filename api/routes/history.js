const history = require('../models/db');

module.exports = function(app) {
    app.get('/api/history', (req, res) => {
        history.get().then((data) => {
            data.map(val => {
                delete val._id;
                val.timestamp = new Date(val.timestamp).toLocaleString();
                return val;
            });
            res.end(JSON.stringify(data, null, 2));
        });
    });
};
