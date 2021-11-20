const Love = require('../models/love');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../config/key');  
 
totalLove = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  let idlugar = req.body.idlugar;
  Love.totalLove(idlugar, (err, data) => {
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
        data: data.totallove,
      });
    }
  });
};
totalLoveLugarUsuario = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "El cuerpo viene vacio!"
      });
    }
  
    let idlugar = req.body.idlugar;
    let idusuario = req.uid;
    Love.totalLoveLugarUsuario(idlugar,idusuario, (err, data) => {
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
          data: data.totallove,
        });
      }
    });
  };
  agregarLove = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
  
    //const encriptado = bcrypt.hashSync(req.body.password, 10);
    // Create a Customer
    const newLove = new Love({
      idlugar: req.body.idlugar,
      idusuario: req.uid
    });
  
    // Save Customer in the database
    Love.registrarLove(newLove, (err, data) => {
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
              message: "Registrado con exito!",
              data: data,
            });
           
        
      }
    });
  };

  eliminarLove = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
  
    let idlugar = req.body.idlugar;
    let idusuario =req.uid;
    Love.eliminarLove(idlugar,idusuario, (err, data) => {
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
    totalLoveLugarUsuario,
    totalLove,
    agregarLove,
    eliminarLove
  }