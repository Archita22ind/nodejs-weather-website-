const path = require('path');
const geocode= require("./utils/geocode");
const forecast = require("./utils/forecast");
const { request } = require('express');
const express = require('express');
const hbs= require('hbs');

const app = express ();
const port =process.env.PORT || 3000;

//Define the paths for express configation
const publicDirectoryPath= path.join(__dirname, '../public');
const viewsPath= path.join(__dirname, '../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

//terminal command : nodemon src/app.js -e js,hbs
//Setup handlebars engine and views location as the views folder has now been renamed as templates
app.set('view engine','hbs');  //key value pair definition, handlebar setup done
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get( '', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Archita Chakraborty',
    });
}) 


app.get ('/about', (req, res)=>{
    res.render('about',{
        title: 'About me:',
        name: 'Archita Chakraborty'
    });
})

app.get ('/help', (req, res)=>{
    res.render('help',{
        title: 'Help Page',
        message : 'I am here to help!',
        name: 'Archita Chakraborty'
    });
})

app.get('/weather', (req, res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address!'
        })
    }
 
geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error) 
            return res.send({error});
    
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) 
             return res.send({error});
         
          res.send({
            address: req.query.address,
            location,
            forecast: forecastData            
        })
         
        })
      })
})


app.get('/help/*',(req,res)=>{
 res.render('404', {
    title : '404',
    errorMessage : 'Help article not found',
    name: 'Archita Chakraborty'
})
})

app.get('*',(req,res)=>{  //* is a wild card
   res.render('404', {
       title : '404',
       errorMessage : 'Page not found',
       name: 'Archita Chakraborty'
   })
})

app.listen(port , ()=>{
    console.log('Server is up on port ' + port);
});

