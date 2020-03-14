const express=require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app= express();

app.use(bodyParser.urlencoded({extended:true}))
app.get("/", function (req, res){
res.sendFile(__dirname + "/index.html");

});
app.post("/", function(req,res){

  console.log("post received")
  const query=req.body.cityName;
  const apiKey="895485ba00078eacde98c8415a4d4551";
  const units = "metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function (response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData=JSON.parse(data);

      const temp=weatherData.main.temp

      const description=weatherData.weather[0].description

      const icon=weatherData.weather[0].icon
      res.write("<p>The weather is currently " + description + "<p>");
      res.write("<h1>The temperature in " + query+ " is " +temp + " degree Celcius</h1>")
      res.write("<img src=https://openweathermap.org/img/wn/" + icon + "@2x.png>")
      res.send()
    })
  } )
})




app.listen(3000, function(){
  console.log("server is running")
})
