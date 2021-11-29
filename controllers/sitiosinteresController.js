const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../config/key');
const SitiosInteres = require('../models/sitiosinteres'); 
require('dotenv').config()
const port = process.env.PORT || 3001;
 
obtenerSitiosInteresPorLugar = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  SitiosInteres.obtenerSitiosInteres(req.body.idlugar, (err, data) => {
    if (err) {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }
    else {
     
      res.send({
        success: true,
        message: "Si encontro resultado",
        data: data,
      });
    }
  });
};
obtenerSitiosInteresPorLugarv2 = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  SitiosInteres.obtenerSitiosInteresv2(req.body.idlugar, (err, data) => {
    if (err) {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }
    else {
     
      res.send({
        success: true,
        message: "Si encontro resultado",
        data: data,
      });
    }
  });
};
module.exports = {
    obtenerSitiosInteresPorLugar,
    obtenerSitiosInteresPorLugarv2 
}