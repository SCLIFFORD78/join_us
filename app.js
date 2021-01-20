var express = require('express');
     
var app = express();
 
app.get("/", function(req, res){
 res.send("HELLO FROM OUR WEB APP!");
});
 
app.listen(8080, function () {
 console.log('App listening on port 8080!');
});