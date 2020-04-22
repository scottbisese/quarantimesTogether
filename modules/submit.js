'use strict';
const handleError = require('./error');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

//submit the story
function submitStory(req, res) {
    const sql = 'INSERT INTO stories (name,location,story,category) VALUES($1, $2, $3, $4) RETURNING id;';
    const values = [req.body.name, req.body.location, req.body.story, req.body.category];
    client.query(sql, values).then((sqlResponse) => {
      res.redirect('stories');
    }).catch(err =>
      handleError(err, req, res));
  }

  module.exports = submitStory;