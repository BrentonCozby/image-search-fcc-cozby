const express = require('express');
const path = require('path');
const app = express();

app.set('port', (process.env.PORT || 3000));

app.set('views', path.join(__dirname, 'views', 'pages'));
app.set('view engine', 'ejs');

// set routes
[
    require('./app/routes/index.js'),
    require('./app/routes/api.js'),
    require('./app/routes/history.js')
].forEach(route => {
    route(app);
});

app.listen(app.get('port'), function() {
    console.log('Image Search is running on port', app.get('port'));
});
