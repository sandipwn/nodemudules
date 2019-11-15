const express = require("express");
const app = express();
const config = require("config");
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const port = parseInt(config.get("port"));


var adminrouter = require("./admin");
var emprouter = require("./emp");

app.use("/admin",adminrouter);
app.use("/emp",emprouter);


app.listen(port,function(){
    console.log("start connection...."+ port);
});
