let express = require('express');
let app = express();
let ejs = require('ejs');
const octocat = require('./octocat.json');
const port = process.env.PORT || 3000;

// Security issue - hard code credentials in MySQL config pool 
const { Pool } = require('pg')
const pool = new Pool({
    user: 'dbuser',
    host: 'database.server.com',
    database: 'mysql',
    password: process.env.MYSQL_PASSWORD,
    port: 3033,
})

// uncomment to fix Code scanning alert - Missing rate limiting
// set up rate limiter: maximum of five requests per minute
// var RateLimit = require('express-rate-limit');
// var limiter = new RateLimit({
//   windowMs: 1*60*1000, // 1 minute
//   max: 5
// });

// apply rate limiter to all requests
// app.use(limiter);

// set to use ejs for rendering
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index', {octocat: octocat});

  // Security issue - database query from user input 
  const search = req.params.q
    if (search != "") {
        var squery = "SELECT * FROM users WHERE name = \"" + search + "\""
        pool.query(squery, (err, results) => {
            if(err) {
                console.log(err, results)
            }
            else {
                res.send(results.rows)
            }
        })
    }


});

app.listen(port);
// view the site on http://localhost:3000/






