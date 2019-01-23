// In order to start program type 'npm start' or 'ctrl + c' to stop in powershell.
// Libraries
const express = require('express');
const bodyParser = require('body-parser');

const cassandra = require('cassandra-driver');
const PORT = 9000;

const app = express();
// Connecting to Cassandra DB
const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    keyspace: 'crimes',
});


// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// for parsing application/json
app.use(bodyParser.json());

// Required to bypass cross site XMLHTTPRequests
app.use(function(req, res, next){
    const origin = req.get('origin');
	// Allow client
    res.header('Access-Control-Allow-Origin', origin);
	// Allow all header requests
    res.header('Access-Control-Allow-Headers', '*');
	// Allow all methods (POST, GET, PUT, DELETE, ect)
    res.header('Access-Control-Allow-Methods', '*');
	// Send identity
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// Get request
app.get('/db', (req, res, next) => {
    const query = 'select * from general_crimes';
    // const query = 'select * from wiltshire_street';
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

app.all('*', (req, res, next) => {res.status(404).send('Not found');});

// Start server on port 9000
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});
