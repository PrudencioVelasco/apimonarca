const {Comentario,ComentarioLugar,ReporteComentarioLugar,ComentarioTour} = require('../models/comentario');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../config/key');  
agregarComentario = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
   
    const comentario = new Comentario({
      idlugar: req.body.idlugar,
      idusuario: req.uid,
      comentario: req.body.comentario, 
      fecha: new Date(), 
    });
  
    // Save Customer in the database
    Comentario.insertarComentario(comentario, (err, data) => {
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
              data: data.id,
            });
         
        
      }
    });
  };

  agregarReporteComentarioLugar = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
   
    const reporte = new ReporteComentarioLugar({
      idcomentario: req.body.idcomentario,
      idcausareporte : req.body.idcausareporte, 
      comentario : req.body.comentario,  
      idusuario: req.uid, 
      fecharegistro:new Date(), 
      atendido: 0,
      eliminado: 0
    });
  
    // Save Customer in the database
    Comentario.insertarReporteComentarioLugar(reporte, (err, data) => {
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
              data: data.id,
            });
         
        
      }
    });
  };
  agregarComentarioLugar = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
   
    const comentario = new ComentarioLugar({
      idlugar: req.body.idlugar,
      idconquienvisito : req.body.idconquienvisito, 
      rating : req.body.rating,  
      comentario: req.body.comentario, 
      fechavisito: req.body.fechavisito, 
      eliminado : 0,
      fecharegistro: new Date(), 
      idusuario: 4,
    });
  
    // Save Customer in the database
    Comentario.insertarComentarioLugar(comentario, (err, data) => {
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
              data: data.id,
            });
         
        
      }
    });
  };

obtenerComentariosPorLugar = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
  
    let idlugar = req.body.idlugar;
    let idcomentario = req.body.idcomentario;
    let limite = req.body.limite;
    Comentario.obtenerComentariosPorLugar(idlugar,idcomentario,limite, (err, data) => {
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
  obtenerComentariosLugarv2 = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
  
    let idlugar = req.body.idlugar;
    let idcomentario = req.body.idcomentario;
    let limite = req.body.limite;
    Comentario.obtenerComentariosLugarv2(idlugar,idcomentario,limite, (err, data) => {
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
  eliminarComentariov2 = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
  
    let valor = req.body.idcomentario;
    Comentario.eliminarComentariov2(valor, (err, data) => {
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
          message: "Fue eliminado el cometario con exito.",
          data: data,
        });
      }
    });
  };
  deleteComentario = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
  
    let valor = req.body.idcomentario;
    Comentario.eliminarComentario(valor, (err, data) => {
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
          message: "Fue eliminado el cometario con exito.",
          data: data,
        });
      }
    });
  };
  totalComentarioLugar = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
  
    let idlugar = req.body.idlugar; 
    Comentario.totalComentarioLugar(idlugar, (err, data) => {
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
          data: data.totalcomentario,
        });
      }
    });
  };
  totalComentarioLugarUsuario = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
  
    let idlugar = req.body.idlugar; 
    let idusuario = req.uid;
    Comentario.totalComentarioLugarUsuario(idlugar,idusuario, (err, data) => {
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
          data: data.totalcomentario,
        });
      }
    });
  };
  obtenerComentariosTour = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
  
    let idtour = req.body.idtour;
    let idcomentario = req.body.idcomentario;
    let limite = req.body.limite;
    Comentario.obtenerComentariosTour(idtour,idcomentario,limite, (err, data) => {
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
  deleteComentario,
    agregarComentario,
    obtenerComentariosPorLugar,
    totalComentarioLugar,
    totalComentarioLugarUsuario,
    agregarComentarioLugar,
    obtenerComentariosLugarv2,
    eliminarComentariov2,
    agregarReporteComentarioLugar,
    obtenerComentariosTour
  }