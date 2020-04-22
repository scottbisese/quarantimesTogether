'use strict';


// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const handleError = require('./modules/error');
const showStories = require('./modules/stories');
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
app.use(express.urlencoded({extended:true}));

//routes
app.get('/', (req, res) => {
    res.render('pages/index');
});
app.get('/views/pages/submission', (req,res) => {
  res.render('pages/submission', )
});
app.get('/views/pages/stories', (req,res) => {
  showStories(req,res);
});
app.post('/views/pages/submission', submitStory);


  //submit the story
function submitStory(req,res){
      const sql = 'INSERT INTO stories (name,location,story,category) VALUES($1, $2, $3, $4) RETURNING id;';
      const values = [req.body.name, req.body.location, req.body.story, req.body.category];
      client.query(sql,values).then((sqlResponse)=>{
        // const sql = 'SELECT * FROM stories';
        // client.query(sql).then((sqlResponse)=> {
        //   console.log(sqlResponse);
          // res.redirect('pages/stories', {stories: sqlResponse});
          res.redirect('stories');
        // })
      }).catch(err =>
        handleError(err, req, res));
    }
  
  
  function getErrorHandler(res,status = 500) {
    return (error) => handleError(res,error,status);
  }
  


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));



