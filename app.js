var express = require('express');

var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.set('views', path.join(__dirname, '/views'));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}));

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'join_us',
    port: '3306'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


app.get("/", function (req, res) {
    var q = 'SELECT COUNT(*) as count FROM users';
    connection.query(q, function (error, results) {
        if (error) throw error;
        var msg = "We have " + results[0].count + " users";
        //res.send(msg);
        res.render('home', {data: results[0].count});

    });
});

/* app.get("/joke", function(req, res){
    var joke = "What do you call a dog that does magic tricks? A labracadabrador.";
    res.send(joke);
   }); */

   app.post('/register', function(req,res){
    var person = {email: req.body.email};
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
    //console.log(err);
    console.log(result);
    res.redirect("/");
    });
   });

app.listen(8080, function () {
    console.log('App listening on port 8080!');
});