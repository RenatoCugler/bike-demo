const express = require('express');
const unirest = require('unirest');
const Incident = require('../models/incident');

const router = express.Router();

module.exports = (app) => {
  app.use('/incidents', router);

  app.use(function(req, res, next){
    res.status(404);
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: '404 - Page Not found' });
      return;
    }
  });

};

router.get('/:lat_long', (req, res, next) => {
  var url = 'https://bikewise.org:443/api/v2/incidents?page=1&incident_type=theft&proximity='+req.params.lat_long +'&proximity_square=2'
  console.log("API call: "+ url )
  unirest.get(url)

  .end(function (response) {
    
    const newIncidents = [];

    response.body.incidents.forEach(element => {
      newIncidents.push(new Incident(element));
    });
    res.render('incidents', {
      title: 'List of bikes reported stolen',
      incidents: newIncidents
    });
  });

});


router.get('/', (req, res, next) => {
  res.render('incidents', {
   title: 'Stolen bikes near you'
 });
 
});