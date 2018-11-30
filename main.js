// In order to start program type 'npm start' or 'ctrl + c' to stop in powershell.
// Libraries
const express = require('express');
const bodyParser = require('body-parser');

const cassandra = require('cassandra-driver');

const app = express();
// Connecting to Cassandra DB
const client = new cassandra.Client({
    contactPoints: ['localhost'],
    keyspace: 'crimes',
});

// Parsing body data from requests
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// for parsing application/json
app.use(bodyParser.json());

// Required to bypass cross site XMLHTTPRequests
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// Get request
app.get('/db', (req, res, next) => {
    const query = 'select * from general_crimes';
    client.execute(query).then(result => {
        res.json(result.rows);
    });
});

// Post request
app.post('/login', (req, res) => {
    console.log('Receiving data...');
    console.log('body is', req.body);
    res.send(req.body);
});

// Start server on port 9000
app.listen(9000, () => {
    console.log('Now listening on port 9000');
});