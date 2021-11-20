const Actividad = require('../models/actividad');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../config/key'); 
todasActividades = (req, res) => {
    Actividad.todasActividades((err, data) => {
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

  obtenerActividadLugar = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
  
    let valor = req.body.idlugar;
    Actividad.obtenerActividadLugar(valor, (err, data) => {
      if (err) {
        res.status(500).send({
          success: false,
          message:
            err.message || "Some error occurred while creating the Customer.",
          error: err.message
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
    todasActividades,
    obtenerActividadLugar
  }