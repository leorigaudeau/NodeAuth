const bodyParser = require("body-parser");
const  express  = require("express");
const  argv  = require("yargs").argv;
const app = express();
const  Auth  = require("./Auth");


let auth = new Auth();

app.use(bodyParser.json());
app.post("/newNode", (req, res) => {
  let {port} = req.body;
  console.log(port);
  
  var exist = auth.ports.findIndex(portiter => {
    if (port === portiter) {
      return portiter;
    }
  });
  if (exist === -1) {
    auth.ports.push(port);
    res.status(200).send(auth.ports)
  }else{
    console.log("ici");
    
    res.status(400).send()
  }
});
// Start server
app.listen(5000, () => {
  console.log(`Server listening`, 5000);
});
