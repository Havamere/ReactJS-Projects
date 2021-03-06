// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongojs = require('mongojs');
var helper = require('./app/Components/utils/helpers.js');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
var databaseUrl = 'places';
var collections = ["searches"];

// use mongojs to hook the database to the db variable 
var db = mongojs(databaseUrl, collections);

db.on('error', function (err) {
  console.log('MongoDB Error: ', err);
});


// -------------------------------------------------

// Main Route. This route will redirect to our rendered React application
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})

// This is the route we will send GET requests to retrieve our most recent click data.
// We will call this route the moment our page gets rendered
app.get('/api/', function(req, res) {

  // This GET request will search for the latest clickCount
  db.searches.find({}).sort({"Timestamp": }).limit(5, function(err, doc){

      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    });
});

// This is the route we will send POST requests to save each click.
// We will call this route the moment the "click" or "reset" button is pressed.
app.post('/api/', function(req, res){

  console.log("this is the request: " + req.body);

  db.searches.insert({"search": req.body.search, "Timestamp": Date.now()}, function(err, data){
    if(err){
        console.log(err);
      }
      else {
        res.send(data);
      }
  });
});


// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
