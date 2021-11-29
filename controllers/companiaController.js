const Compania = require('../models/compania');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../config/key'); 
showAllCompanies = (req, res) => {
    Compania.showAllCompanies((err, data) => {
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
  mostrarCompaniasXClasificacion = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
  
    Compania.mostrarCompaniasXClasificacion(req.body.idclasificacion, (err, data) => {
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
    detalleCompania = async(req,res=response)=>{
      if (!req.body) {
        res.status(400).send({
          success: false,
          message: "Content can not be empty!"
        });
      }
    Compania.detalleCompania(req.body.idcompania, async (err, data)  => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            success: false,
            message: `Not found Customer with id ${req.body.idcompania}.`
          });
         
        } else {
          res.status(500).send({
            success: false,
            message: "Error retrieving Customer with id " + req.body.idcompania
          });
        }
      } 
      else {
         //EXISTE EL REGISTRO EN LA BASE DE DATOS 
        res.send({
          success: true,
          message: "Si encontro resultado", 
          data: data,
        });
      }
    })  
    };
module.exports = {
    showAllCompanies,
    mostrarCompaniasXClasificacion,
    detalleCompania
  }