'use strict';


// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const handleError = require('./modules/error');
const showStories = require('./modules/stories');
// const submitStory = require('./modules/submit');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

// Application Setup
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors()); //middleware
app.use(express.static('public'));

//view engine/templating
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', (req, res) => {
  res.render('pages/index');
});
app.get('/views/pages/submission', (req, res) => {
  getQuote(req, res);
  // res.render('pages/submission', )
});
app.get('/views/pages/stories', (req, res) => {
  showStories(req, res);
});
app.post('/views/pages/submission', submitStory);


// submit the story
function submitStory(req, res) {
  const sql = 'INSERT INTO stories (name,location,story,category) VALUES($1, $2, $3, $4) RETURNING id;';
  const values = [req.body.name, req.body.location, req.body.story, req.body.category];
  client.query(sql, values).then((sqlResponse) => {
    res.redirect('stories');
  }).catch(err =>
    handleError(err, req, res));
}

function getQuote(req, res) {
  const url = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en ';
 superagent.get(url).then(quoteResponse => {
    let quotes = quoteResponse.body;
    console.log({quotes: quotes});
    res.render('pages/submission', {quotes: quotes});
  }).catch(err =>
    handleError(err, req, res));
  

}


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));



