/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START gae_node_request_example]
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
// [END gae_node_request_example]
