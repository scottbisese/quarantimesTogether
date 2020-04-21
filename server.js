'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');

// Application Setup
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors()); //middleware

//routes
app.get('/', (request, response) => {
    response.send('Home Page!');
});



app.listen(PORT, () => console.log(`http://localhost:${PORT}`));



