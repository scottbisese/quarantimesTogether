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

//functions
//book function
function Stories(story){
    this.id = story.id ? story.id : 'no id available';
    this.user = story.user ? story.user : 'no user available';
    this.location = story.location ? story.location : 'no location available';
    this.story = story.story ? story.story : 'no story available';
    this.category = story.category ? story.category : 'no category available';
  }

function showHomepage(req,res) {
    client.query('SELECT * FROM stories;').then(stories => {
      res.render('pages/homepage',{stories:stories.rows});
    }).catch(getErrorHandler(res));
  }



app.listen(PORT, () => console.log(`http://localhost:${PORT}`));



