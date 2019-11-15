const express = require("express");
const emprouter = express();
//var Joi =require("joi");

var mydata = [];

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'manager',
  database : 'sd'
});
connection.connect();
 
//function validate(bodyContent)
//{
  //  const schema = {
    //    "name": Joi.string().length(6).required(),
      //  "no": Joi.number().required(),
        //"address": Joi.required()
        //};
   //return Joi.validate(bodyContent , schema);
//}

emprouter.post("/",function(request,response){

    //let resultOfValidation= validate(request.body);
    //console.log(resultOfValidation);
    //if(resultOfValidation.error==null)
   // {
    let eno = parseInt(request.body.no);
    let ename = request.body.name;
    let eaddress = request.body.address;

    let query = `insert into sd values(${eno} , '${ename}' , '${eaddress}')`;
    console.log(query);

    connection.query( query,function(err,result){
        if(err == null)
        {
            response.contentType("application/json");
            response.send(JSON.stringify(result));
        }
        else
        {
            response.contentType("application/json");
            response.send(JSON.stringify(err));
        }
    });
// }
// else
// {
//     response.contentType("application/json");
//     response.send(JSON.stringify(resultOfValidation));
// }
});

emprouter.put("/:no",function(request,response){

    let eno = parseInt(request.params.no);
    let ename = request.body.name;
    let eaddress = request.body.address;

    let query = `update sd set name='${ename}',address='${eaddress}' where no= ${eno}`;
    console.log(query);

    connection.query( query,function(err,result){
        if(err == null)
        {
            response.contentType("application/json");
            response.send(JSON.stringify(result));
        }
        else{
            response.contentType("application/json");
            response.send(JSON.stringify(err));
        }
    });
});

emprouter.delete("/:no",function(request,response){

    let eno = parseInt(request.params.no);

    let query = `delete from sd where no=${eno}`;
    console.log(query);

    connection.query( query,function(err,result){
        if(err == null)
        {
            response.contentType("application/json");
            response.send(JSON.stringify(result));
        }
        else{
            response.contentType("application/json");
            response.send(JSON.stringify(err));
        }
    });
});

emprouter.get("/",function(request,response){
    connection.query("select * from sd order by no",function(err,result){
        if(err == null)
        {
            mydata = result;
            response.contentType("application/json");
            response.send(JSON.stringify(mydata));
        }
        else{
            response.send("something went wrong");
        }
    });
});


emprouter.get("/:no", function(request, response){
    console.log("You searched for " + request.params.no);
    
    connection.query(`select * from sd where no =${request.params.no}`, function(err, result){
        if(err==null)
        {
           mydata =  result;
           response.contentType("application/json");
           response.send(JSON.stringify(mydata));
        }
        else
        {
           response.send("Something went wrong!"); 
        }
    });
    
});

module.exports = emprouter
