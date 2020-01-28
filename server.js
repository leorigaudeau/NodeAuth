const bodyParser = require("body-parser");
const express = require("express");
const axios = require("axios");
const app = express();
const Auth = require("./Auth");

let auth = new Auth();

app.use(bodyParser.json());
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});
app.post("/newnode", (req, res,next) => {
  let { port } = req.body;
  console.log(port);
  if (!port) {
    res.status(400).send("port undefined");
  }
  var exist = auth.ports.findIndex(portiter => {
    if (port === portiter) {
      return portiter;
    }
  });
  if (exist === -1) {
    auth.ports.forEach(element => {
  
      if (element != 5000) {
        axios.post("http://localhost:"+element+"/syncports",{ports: auth.ports})
      }
    });
    auth.ports.push(port);
    auth.id++;
    res.status(200).send(auth);
  } else {
    res.status(400).send();
  }
});
app.post("/sync", (req, res,next) => {
  let { block } = req.body;
  auth.blockChain.push(block);
  res.status(200).send(auth.blockChain);
});
// Start server
app.listen(5000, () => {
  console.log(`Server listening`, 5000);
});
