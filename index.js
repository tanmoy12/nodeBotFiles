'use strict';

const express= require('express');
const bodyParser= require('body-parser');
const path = require('path');

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine( 'ejs', engine );
app.set( 'views', path.join( __dirname, 'views' ));
app.set( 'view engine', 'ejs' );

app.use(express.static(process.cwd() + '/public'));

var facebook = require('./routes/facebook');
var index = require('./routes/site');

app.use('/', index);
app.use('/webhook', facebook);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(app.get('port'), function(){
    console.log("port running");
});

