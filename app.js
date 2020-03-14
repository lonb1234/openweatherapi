const express=require("express");
const https = require("https");
const app= express();

app.get("/", function (req, res){
const url="https://api.openweathermap.org/data/2.5/weather?q=Horst&appid=895485ba00078eacde98c8415a4d4551&units=metric"
  https.get(url, function (response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData=JSON.parse(data);

      const temp=weatherData.main.temp

      const description=weatherData.weather[0].description

      const icon=weatherData.weather[0].icon
      res.write("<p>The weather is currently " + description + "<p>");
      res.write("<h1>The temperature in Horst is " +temp + " degree Celcius</h1>")
      res.write("<img src=https://openweathermap.org/img/wn/" + icon + "@2x.png>")
      res.send()
    })
  } )

})


app.listen(3000, function(){
  console.log("server is running")
})
