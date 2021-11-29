const CausaReporte = require('../models/causa_reporte');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../config/key'); 
todasCausasReportes = (req, res) => {
    CausaReporte.todasCausasReportes((err, data) => {
      if (err)
        res.status(500).send({
          success: false,
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send({
        success: true,
        message: "Exito",
        data: data
      });
    });
  };
 
  
module.exports = {
    todasCausasReportes, 
  }