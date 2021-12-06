const {Love,LoveTour} = require('../models/love');
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
  totalLoveTourUsuario = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "El cuerpo viene vacio!"
      });
    }
  
    let idtour = req.body.idtour;
    let idusuario = req.uid;
    Love.totalLoveTourUsuario(idtour,idusuario, (err, data) => {
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
   
   
    Love.registrarLove(1,req.body.idlugar, req.uid, (err, data) => {
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

//AGREGAR LOVE TOUR
  agregarLoveTour = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
   
    Love.registrarLoveTour(2,req.body.idtour, req.uid, (err, data) => {
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
  eliminarLoveTour = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
  
    let idtour = req.body.idtour;
    let idusuario =req.uid;
    Love.eliminarLoveTour(idtour,idusuario, (err, data) => {
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
  totalLoveTour = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
  
    let idtour = req.body.idtour;
    Love.totalLoveTour(idtour, (err, data) => {
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
module.exports = {
    totalLoveLugarUsuario,
    totalLoveTourUsuario,
    totalLove,
    totalLoveTour,
    agregarLove,
    agregarLoveTour,
    eliminarLove,
    eliminarLoveTour
  }