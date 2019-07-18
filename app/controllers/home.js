//<script type="text/javascript" src="https://cdn.cobi.bike/cobi.js/0.44.0/cobi.js" />

const express = require('express');
const unirest = require('unirest');

const router = express.Router();
//const Article = require('../models/article').default;
//const Incident = require('../models/incident').default.;

module.exports = (app) => {
  app.use('/', router);
};


router.get('/lat/:lat/long/:long', (req, res, next) => {

  //TODO - check input parameters
  console.log("Input params latitude - "+ req.params.lat + ", longitude - "+ req.params.long)
  var url = 'https://bikewise.org:443/api/v2/incidents?page=1&incident_type=theft&proximity='+req.params.lat +' %2C'+req.params.long +'&proximity_square=2'

  console.log("API call: "+ url )
  unirest.get(url)
  //unirest.get('https://bikewise.org:443/api/v2/incidents?page=1&incident_type=theft&proximity=50.11913%2C8.63877&proximity_square=2')

  .end(function (response) {

    var data= response.body;
    var incidents = data.incidents;

    var count = data.incidents.length;
    console.log("Incidents reported by the API: "+ count);

    var safety_style;
    var safety_message;

    switch(true)
    {
      case (count == 0 ):
          safety_style = 'my-content-neutral';
          safety_message= 'Enjoy your ride!';
          safety_description = '';
        break;
      case (count < '2'):
          safety_style = 'my-content-yellow';
          safety_message = 'WARNING';
          safety_description = 'A bike was reported stolen in this region.'
        break;
      default:
          safety_style = 'my-content-red';
          safety_message = 'AVOID THIS AREA';
          safety_description =  count + ' bikes reported stolen in this region';
        break;
    }

    res.render('bike-theft', {
      title: 'Stolen Bikes near you',
      message: 'Waiting for COBI.Bike to load...',
      safety_message: safety_message,
      safety_style: safety_style,
      safety_description:safety_description,
      incidents: incidents
    });
    
  });
});


router.get('/', (req, res, next) => {
  
  unirest.get('https://bikewise.org:443/api/v2/incidents?page=1&incident_type=theft&proximity=50.11913%2C8.63877&proximity_square=2')

  .end(function (response) {

    var data= response.body;
    var incidents = data.incidents;

    var count = data.incidents.length;
    console.log("Incidents reported by the API: "+ count);

    var safety_style;
    var safety_message;

    switch(true)
    {
      case (count == 0 ):
          safety_style = 'my-content-neutral';
          safety_message= 'Enjoy your ride!';
          safety_description = '';
        break;
      case (count < '2'):
          safety_style = 'my-content-yellow';
          safety_message = 'WARNING';
          safety_description = 'A bike was reported stolen in this region.'
        break;
      default:
          safety_style = 'my-content-red';
          safety_message = 'AVOID THIS AREA';
          safety_description =  count + ' bikes reported stolen in this region';
        break;
    }

    res.render('bike-theft', {
      title: 'Stolen Bikes near you',
      message: 'Waiting for COBI.Bike to load...',
      safety_message: safety_message,
      safety_style: safety_style,
      safety_description:safety_description,
      incidents: incidents
      
    });
    
  });
});
