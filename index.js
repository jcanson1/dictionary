const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const fs = require('fs');
//const datastore = require('./db/datastore.json');
//Currently getting this error when uncommenting path to datastore
  /*
  SyntaxError: /Users/regiekong/Desktop/Cy/Technical Challenges/orderful/db/datastore.json: Unexpected token u in JSON at position 0
  */

const port = 9000;

app.use(express.static(__dirname + '/'));
//use the bodyParser middleware to parse the request body and place the result in request.body of your route
app.use(jsonParser);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE", "OPTIONS");
    res.header("Access-Control-Allow-Credentials",true);
    next();
});

app.listen(port, (req, res) =>{
  console.log('Hi Cy, working on Orderful Technical Challenge on port ' + port + '__dirname', __dirname);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


//Writing to datastore.json 
//Currently getting this error:
  /* 
  SyntaxError: Unexpected token u in JSON at position 0
    at JSON.parse (<anonymous>)
    at fs.readFile (/Users/regiekong/Desktop/Cy/Technical Challenges/orderful/index.js:48:20)
    at tryToString (fs.js:426:3)
    at FSReqWrap.readFileAfterClose [as oncomplete] (fs.js:413:12)
  */
app.post('/', jsonParser, (req, res) => {
  if (!req.body) {
    console.log('POST ERROR')
    return res.sendStatus(400)
  }
  //send success message back to client
  res.send('success')
  //write to datastore.json
  let wordData = req.body.stringify;
  fs.writeFileSync('./db/datastore.json', wordData, (err) => {
    console.log('writing to datastore', wordData);
    console.log('successfully wrote to file'); 
  })
  fs.readFile('./db/datastore.json','utf8', (err, data) =>{
    if (err) {
      throw err;
    }
    let obj = JSON.parse(data);
    console.log('reading file', obj)
  })
})
