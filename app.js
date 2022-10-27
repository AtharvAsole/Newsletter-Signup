//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){


  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.mail;


  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_feilds:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]

  };
  const jsonData = JSON.stringify(data);

  const url = "https://us12.api.mailchimp.com/3.0/lists/ac4d18279a";

  const options = {
    method:"POST",
    auth:"atharv7:5b64dabed1596b219742bb0d2e36b952-us12"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode==200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();


});


app.post("/failure", function(req, res){
  res.redirect("/")
})


//while hosting use process.env.PORT instead of 3000
app.listen(3000, function(){
  console.log("Server is up and Running at port 3000");
});



// api keys
// 5b64dabed1596b219742bb0d2e36b952-us12

//list id
// ac4d18279a
