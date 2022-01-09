const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../config/key');
const Ruta = require('../models/ruta'); 
require('dotenv').config()
const port = process.env.PORT || 3001;

 
todasRutasVisibles = (req, res) => {
  // Validate request
 
  Ruta.todasRutasVisibles ((err, data) => {
    if (err) {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while creating the Customer.",
        error: err.message
      });
    }
    else {
      var jsonArr = [];
      for (var i = 0; i < data.length; i++) {

       // let urlimagen = 'http://10.0.2.2:3000/' + data[i].imagen;
       //let urlimagen =  process.env.CONF_URL+ data[i].imagen;
       let urlimagen  ="";
       if(data[i].imagen != null){
           urlimagen =  process.env.CONF_URL+ data[i].imagen;
       }
        jsonArr.push({
          idruta: data[i].idruta,
          idclasificacion: data[i].idclasificacion,
          nombre: data[i].nombre,
          imagen:urlimagen,
          descripcion: data[i].descripcion,
        });
      }
      res.send({
        success: true,
        message: "Si encontro resultado",
        data: data,
      });
    }
  });
};
obtenerLugaresRuta = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  Ruta.obtenerLugaresRuta(req.body.idruta, (err, data) => {
    if (err) {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }
    else {
      var jsonArr = [];
      for (var i = 0; i < data.length; i++) { 
        let urlimagen  ="";
        if(data[i].primeraimagen != null ){
            urlimagen = process.env.CONF_URL+ data[i].primeraimagen;
        }
        
        jsonArr.push({
          idlugar: data[i].idlugar,
          nombre: data[i].nombre,
          direccion: data[i].direccion,
          latitud: data[i].latitud,
          longitud: data[i].longitud,
          descripcion: data[i].descripcion,
          historia: data[i].historia,
          resena: data[i].resena,
          love: data[i].love,
          comentario: data[i].comentario,
          primeraimagen:  urlimagen,
          nombreclasificacion: data[i].nombreclasificacion,
          //imagenes : data[i].imagenes,
          //actividades : data[i].actividades,
          principal: data[i].principal,
          numero: data[i].numero,
        });
      }
      res.send({
        success: true,
        message: "Si encontro resultado",
        data: data,
      });
    }
  });
};
module.exports = {
  todasRutasVisibles,
    obtenerLugaresRuta
}