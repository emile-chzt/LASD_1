//load the express package and create our app
var express    = require('express');		// call express
var app        = express(); 				// define our app using express
var path 	   = require('path');


app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
  
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});


//start the server
app.listen(8080)


// tell ourselves what's happening
console.log('Visit me at http://localhost:8080');
