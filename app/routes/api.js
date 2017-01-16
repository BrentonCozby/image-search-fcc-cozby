const search = require('../search');
const history = require('../models/db');

module.exports = function(app) {
    app.get('/api', (req, res) => {
        search(req.query, (err, data) => {
            if (err) res.end(err);

            var images = data.items.map(item => {
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

            delete req.query.start;
            history.push(req.query);

            res.end(JSON.stringify(images, null, 2));
        });
    });
};
