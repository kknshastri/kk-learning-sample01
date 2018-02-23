var express = require('express');
var router = express.Router();
var SectionModel = require('../models/sections');
var constants = require('../config/constants');

/* GET Section. */
router.post('/list', function(req, res, next) {
  console.log("here");
  var listSection = new SectionModel();
  listSection.find(function (err,  section) {
    if (err) return next(err);
    res.json(section);
  });
});

/* POST Section. */
router.post('/', function(req, res, next) {
  var newSection = new SectionModel();
  var curDate = new Date();
  newSection.title = req.body.title;
  newSection.description = req.body.description;
  if(!!req.body.locale ){
    newSection.locale = req.body.locale;
  }
  newSection.created_date =curDate;
  newSection.created_by = 'admin';
  newSection.save(function(err,section) {
    if (err){
        res.json({ status: constants.ERROR_TXT, msg: err.message });
    }else{
        res.json({ status: constants.SUCCESS_TXT, msg: 'Section Saved Successfully' });
    }
  });
});

module.exports = router;