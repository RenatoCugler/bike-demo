const express = require('express');
const unirest = require('unirest');

const router = express.Router();

module.exports = (app) => {
  app.use('/', router);
  
};

router.get('/lat/:lat/long/:long', (req, res, next) => {

  //TODO - check input parameters
  var url = 'https://bikewise.org:443/api/v2/incidents?page=1&incident_type=theft&proximity='+req.params.lat +' %2C'+req.params.long +'&proximity_square=2'
  console.log("API call: "+ url )
  unirest.get(url)

  .end(function (response) {

    var data= response.body;
    var count = data.incidents.length;
    var style;
    var message;
    var description;

    switch(true)
    {
      case (count == 0 ):
          style = 'my-content-neutral';
          message= 'Enjoy your ride!';
          description = '';
        break;
      case (count < '2'):
          style = 'my-content-yellow';
          message = 'WARNING';
          description = 'A bike was reported stolen in the region.'
        break;
      default:
          style = 'my-content-red';
          message = 'AVOID PARKING IN THIS AREA';
          description =  count + ' Bikes reported stolen in the region';
        break;
    }
    res.send({
      display_message: message,
      display_style: style,
      display_description: description
    });

  });
}); 

router.get('/', (req, res, next) => {
     res.render('cobi-module', {
      title: 'Stolen Bikes near you',
      message: 'Waiting for COBI.Bike to load...',
      safety_style: "my-content-neutral"
    });
    
});

