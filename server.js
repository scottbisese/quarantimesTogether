'use strict';
const handleError = require('./modules/error');

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
app.use(express.static('./public'));

//view engine/templating
app.set('view engine', 'ejs');
// app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));

//oh yah loading bars eh?? definitely doing eh?? are you in broh?

//routes
app.get('/', (req, res) => {
    res.send('Go away please.');
});

app.get('/pages/submission', (req,res) => {
  res.render('pages/submission', submitStory())
});

app.get('/pages/stories', (req,res) => {
  showStories(req,res);
});

// app.post('//pages/submission', submitStory());

//functions
//book function
function Stories(story){
    this.name = story.name ? story.name : 'no name available';
    this.location = story.location ? story.location : 'no location available';
    this.story = story.story ? story.story : 'no story available';
    this.category = story.category ? story.category : 'no category available';
  }

function showStories(req,res) {
    client.query('SELECT * FROM stories;').then(stories => {
      console.log(JSON.stringify(stories, null, 2));
      res.render('./pages/stories',{stories:stories.rows});
    }).catch(getErrorHandler(res));
  }

  //submit the story
function submitStory(req,res){
    try {
      const sql = 'INSERT INTO stories (name,location,story,category) VALUES($1, $2, $3, $4) RETURNING id;';
      const values = [req.body.name, req.body.location, req.body.story, req.body.category];
      client.query(sql,values).then((sqlResponse)=>{
        const sql = 'SELECT * FROM stories WHERE id=$1';
        client.query(sql, [sqlResponse.rows[0].id]).then((sqlResponse)=> {
          console.log(sqlResponse);
          res.render('pages/stories', {story: sqlResponse.rows[0] });
        }).catch(getErrorHandler(res));
      }).catch(getErrorHandler(res));
    } catch (error) {
      handleError(res,error);
    }
  }

function renderStory (req,res) {
    req.body.id = req.params.id;
    res.render('pages/stories', {stories:req});
}
  
  function getErrorHandler(res,status = 500) {
    return (error) => handleError(res,error,status);
  }
  


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));



