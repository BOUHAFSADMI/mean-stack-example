const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {

  MongoClient.connect('mongodb://localhost:27017', function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db('mean');

    db.collection('users')
        .find()
        .toArray()
        .then((users) => {
            response.data = users;
            res.json(response);
        })
        .catch((err) => {
            sendError(err, res);
        });
    client.close();
  });
});

module.exports = router;
