const search = require('../search');
const history = require('../models/db');

module.exports = function(app) {
    app.get('/api', function(req, res) {

        var query = {};

        for(var key in req.query) {
            (function() {
                if(req.query.hasOwnProperty(key)) {
                    var val = req.query[key];
                    (function() {
                        key = key.replace('amp;', '');
                        query[key] = val;
                    })(val);
                }
            })(key);
        }

        search(query, function(err, data) {
            var images = data.items.map(function(item) {
                return {
                    snippet: item.snippet,
                    link: item.link,
                    thumbnail: item.image.thumbnailLink,
                    context: item.image.contextLink,
                    height: item.image.height,
                    width: item.image.width,
                    byteSize: item.image.byteSize
                };
            });

            delete query.start;
            history.push(query);

            res.end(JSON.stringify(images, null, 2));
        });
    });
};
