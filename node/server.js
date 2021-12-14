'use strict';

const express = require('express');
const persons = require('./persons')
const path = require('path');

const PORT = 8080;
const HOST = '0.0.0.0';


const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let people;
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host     : 'mysqlsrv',
        user     : 'root',
        password : 'mysql',
        database : 'codeducation'
      });
 
    connection.connect();
 
    connection.query('CREATE TABLE people (userID int, firstName varchar(255), lastName varchar(255));', function (error, results, fields) {
    });
    const {id, firstName, lastName} =  persons[Math.floor(Math.random() * 9) + 1]
    connection.query(`INSERT INTO people (userID, firstName, lastName) VALUES (${id}, '${firstName}', '${lastName}');`, function (error, results, fields) {
      console.log(error);
    });
    connection.query(`SELECT * FROM people;`, function (error, results, fields) {
      console.log(results);
      res.render('index', {
        persons: results
      });
    });
});

app.listen(PORT, HOST);




