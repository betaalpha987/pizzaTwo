// Pizza Poller
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
// This system uses MongoLab - https://mlab.com
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs') // EJS is a simple template engine for rendering the quotes to screen

let db;

MongoClient.connect(process.env.DATABASE_URL, (err,database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(process.env.PORT || 5000, function() {
    console.log('Listening on 5000 (localhost) or to autoassigned port (Heroku)');
  });
});

app.get('/', (req, res) => {
  db.collection('pizza').find().toArray(function(err,result) {
    if (err) return console.log(err);
    //renders index.ejs
    res.render('index.ejs', {pizza:result});
  });
});

app.post('/pizza', (req,res) => {
  //console.log(req.body)
  db.collection('pizza').save(req.body, (err,result) =>{
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  });
});

