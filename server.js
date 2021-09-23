const express = require('express');
var app = express();
const cors = require('cors')

app.use(cors());
app.use(express.urlencoded())
const { Client } = require('pg');
const client = new Client({
    connectionString: "postgres://zoiykvqsyvewtq:dfa14dd49b39aa29e1dfe90d8b2abb64703aef61957480236aea0527b905d778@ec2-54-163-97-228.compute-1.amazonaws.com:5432/d18m8o055omvj1",
    ssl: {
      rejectUnauthorized: false
    }
  });
client.connect();
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.get('/data', function (req, res) {
    client.query('SELECT * FROM stepup', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        console.log(result.rows)
        res.status(200).send(result.rows);
        
    });
});

if(process.env.NODE_ENV === "production"){
  app.use(express.static("frontend/build"));
}


const PORT= 4000;
app.listen(PORT, function () {
    console.log('Server is running.. on Port 4000');
});