const bodyParser = require("body-parser");
const  express  = require("express");
const  argv  = require("yargs").argv;
const app = express();
const  Auth  = require("./Auth");


let auth = new Auth();

app.use(bodyParser.json());
app.post("/newnode", (req, res) => {
  let {port} = req.body;
  if (!port) {
    res.status(400).send('port undefined')
  }
  var exist = auth.ports.findIndex(portiter => {
    if (port === portiter) {
      return portiter;
    }
  });
  if (exist === -1) {
    auth.ports.push(port);
    auth.id++ 
    res.status(200).send(auth)
  }else{
    res.status(400).send()
  }
});
// Start server
app.listen(5000, () => {
  console.log(`Server listening`, 5000);
});
