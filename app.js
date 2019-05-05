'use strict';

const express = require('express');
const app = express();

var MongoClient = require('mongodb').MongoClient, assert = require('assert');
const url = "mongodb+srv://admin:31011997@ipccluster-lneua.gcp.mongodb.net/test?retryWrites=true";

app.get('/:query', (req, res) => {
  var qry = ''+req.params.query;
  MongoClient.connect(url,{useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    var db = client.db('ipc_sections');
    console.log("Connected correctly to server");
    var collection = db.collection('collection1');
    collection.find({ '$text': {'$search' : qry } } ).toArray(function(err, docs) {
    assert.equal(err, null);
    client.close();
    res.send(docs);
  });
  });
 
 
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

