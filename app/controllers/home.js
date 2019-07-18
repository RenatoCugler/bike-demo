const express = require('express');
const unirest = require('unirest');

const router = express.Router();
const Article = require('../models/article');
const Location = require('../models/incident').default;

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  const articles = [new Article(), new Article()];
  res.render('index', {
    title: 'Generator-Express MVC',
    articles: articles
  });
});

router.get('/home', (req, res, next) => {

  unirest.get('https://bikewise.org:443/api/v2/incidents?incident_type=theft&proximity=Chicago%2C%20IL')
  .end(function (response) {

    var data= response.body;
    var incidents = data.incidents;
    res.render('bike-theft', {
      title: 'Stolen Bikes near you',
      incidents: incidents
    });
    
    //res.render('bike');
    //res.send(incidents[0].title);
  });
});
