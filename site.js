const express= require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://localhost:27017/nodebot', (err, database) => {
    if (err) throw err;

    else {
        db = database;
    }
});


router.get('/', function(req, res){
    db.collection('restaurants').find().toArray(function(err, results) {
        //console.log(results);
        // send HTML file populated with quotes here
        if (err) throw err;

        res.render('index.ejs', {restaurants: results});
    });
    //console.log(__dirname);
});


router.post('/restaurants', (req, res) => {
    console.log('Hellooooooooooooooooo!');
    console.log(req.body);

    db.collection('restaurants').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('saved to database');
        res.redirect('/')
    })
});

module.exports = router;
