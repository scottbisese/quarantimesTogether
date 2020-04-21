'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
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

//routes
app.get('/', (request, response) => {
    response.send('Home Page!');
});

function showHomepage(req,res) {
    client.query('SELECT * FROM stories;').then(stories => {
      res.render('pages/homepage',{stories:stories.rows});
    }).catch(getErrorHandler(res));
  }



app.listen(PORT, () => console.log(`http://localhost:${PORT}`));



