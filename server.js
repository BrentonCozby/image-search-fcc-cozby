require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 3000
const rootUrl = `/free-code-camp/image-search`

app.set('port', (process.env.PORT || 3000));

app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'views', 'pages'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// http://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
// Add headers
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${PORT}`);
    res.setHeader('Access-Control-Allow-Origin', 'http://image-search-fcc-cozby.herokuapp.com/api');
    res.setHeader('Access-Control-Allow-Origin', `http://brentoncozby.com/${rootUrl}/api`);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// set routes
[
    require('./api/routes/index.js'),
    require('./api/routes/api.js'),
    require('./api/routes/history.js')
].forEach(function(route) {
    route(app);
});

app.listen(app.get('port'), function() {
    console.log('Image Search is running on port', app.get('port'));
});
