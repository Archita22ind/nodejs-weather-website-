const { response } = require('express');
const request = require('request');

const forecast = (latitude,longitude,callback) =>{

const url='http://api.weatherstack.com/current?access_key=2997efc1c9fb34c10b29648dfa3d6740&query=' + latitude + ',' + longitude + '&units=f';

request({url , json: true}  , (error,{body}) =>{

   if(error)
      callback ('Unable to connect to weather service! ', undefined)
   else if(body.error)
   { 
    callback(body.error.info, undefined);  
   }   
   else
       callback(undefined, 
       body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature  + 
        ' degrees Farenheit out. There is a ' + body.current.precip + '% chance of rain.'
    )
})
}
module.exports=forecast;