// In order to start program type 'npm start' or 'ctrl + c' to stop in powershell.
// Libraries
const express = require('express');
const bodyParser = require('body-parser');

// const cassandra = require('cassandra-driver');
const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const PORT = 9000;

const app = express();

// Connection URL for Mongo DB.
const mongoURL = 'mongodb://localhost:27017';
 
// Mongo Database Name.
const mongoDBName = 'CrimeExplorerDB';

// Connecting to Cassandra DB.
// const cassandraClient = new cassandra.Client({
//     contactPoints: ['127.0.0.1'],
//     keyspace: 'crimes',
// });

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

// Get request for Mongo DB crime data.
app.get('/db', (req, res, next) => {
    // Connecting to Mongo DB
    mongoClient.connect(mongoURL, {useNewUrlParser: true}, function(err, mongoClient) {
        assert.equal(null, err);
        console.log('Connected successfully to Mongo DB server');
        const db = mongoClient.db(mongoDBName);
        db.collection(req.query.region_name).find({$or: req.query.crime_dates}).toArray(function(err, result) {
            assert.equal(err, null);
			
            console.log('Sending crime data...')
            res.json(result);

            mongoClient.close();
            console.log('Closed connection to Mongo DB.');
        });
    });
});

// Get request for Cassandra DB.
// app.get('/db', (req, res, next) => {
//     // const query = 'select * from general_crimes';
//     const query = 'select * from wiltshire_street';
//     // const query = 'select * from all_regions_one_month';
//     cassandraClient.execute(query).then(result => {
//         res.json(result.rows);
//     });
// });

// Get request using pagination on Cassandra DB.
// app.get('/db', (req, res, next) => {
//     // const query = 'select * from all_regions_one_month';
//     const query = 'select * from wiltshire_street';
//     var allData = [];
//     cassandraClient.stream(query).on('readable', function () {
//         var row;
//         while (row = this.read()) {
//         allData.push(row);
//         }
//     }).on('end', function () {
//         res.json(allData);
//     });
// });


// Get request for regional coordinate data.
app.get('/regions', (req, res, next) => {
    // Connecting to Mongo DB
    mongoClient.connect(mongoURL, {useNewUrlParser: true}, function(err, mongoClient) {
        assert.equal(null, err);
        console.log('Connected successfully to Mongo DB server');
        const db = mongoClient.db(mongoDBName);
        db.collection("region_coordinates").find({}).toArray(function(err, result) {
            assert.equal(err, null);
            console.log('Sending region data...')
            res.json(result);
            mongoClient.close();
            console.log('Closed connection to Mongo DB.');
        });
    });
});

app.all('*', (req, res, next) => {res.status(404).send('Not found');});

// Start server on port 9000
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});
