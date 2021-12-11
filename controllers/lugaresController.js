const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../config/key');
const Lugar = require('../models/lugar');
const Ruta = require('../models/ruta'); 
require('dotenv').config() 
sliderPrincipal = (req, res) => {
  Lugar.sliderPrincipal((err, data) => {
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

        //let urlimagen = process.env.CONF_URL+ data[i].primeraimagen;
        let urlimagen  ="";
        if(data[i].primeraimagen != null){
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
          rating: data[i].rating,
          primeraimagen:data[i].primeraimagen,
          nombreclasificacion: data[i].nombreclasificacion, 
          principal: data[i].principal
        });
      }
      res.send({
        success: true,
        message: "Si encontro resultado",
        data: jsonArr,
      });
    }
  });
};
obtenerImagenesLugar = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  Lugar.obtenerImagenesLugar(req.body.idlugar, (err, data) => {
    if (err) {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }
    else {
      var jsonArr2 = [];
      for (var i = 0; i < data.length; i++) { 
        let urlimagen  ="";
        if(data[i].nombre != null ){
            urlimagen = process.env.CONF_URL+ data[i].nombre;
        }
       // let urlimagen = process.env.CONF_URL + data[i].nombre; 
        jsonArr2.push({
          idimagen:data[i].idimagen, 
          idlugar: data[i].idlugar, 
          nombre:urlimagen
        });
      }
      res.send({
        success: true,
        message: "Si encontro resultado",
        data: jsonArr2,
      });
    }
  });
};
sliderLugaresTops = (req, res) => {
  Lugar.sliderLugaresTops((err, data) => {
    if (err){
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }
    else {
      var jsonArr = [];
      for (var i = 0; i < data.length; i++) {

       // let urlimagen = process.env.CONF_URL+ data[i].primeraimagen;
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
          rating: data[i].rating,
          primeraimagen: data[i].primeraimagen,
          nombreclasificacion: data[i].nombreclasificacion, 
          principal: data[i].principal
        });
      }
      res.send({
      success: true,
      message: "Exito",
      data: jsonArr
    });
  }
  });
};
sliderRutasTops = (req, res) => {
  Ruta.sliderRutasTops((err, data) => {
    if (err){
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }
    else{ 
      
      res.send({
      success: true,
      message: "Exito",
      data: data
    });
  }
  });
};

buscarLugaresActivos = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  let valor = req.body.valor;
  Lugar.buscarLugaresActivos(valor, (err, data) => {
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

       // let urlimagen = 'http://10.0.2.2:3000/' + data[i].primeraimagen;

       // let urlimagen =  process.env.CONF_URL+ data[i].primeraimagen;
        let urlimagen  ="";
        if(data[i].primeraimagen != null  ){
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
          rating: data[i].rating,
          primeraimagen: data[i].primeraimagen,
          nombreclasificacion: data[i].nombreclasificacion, 
          principal: data[i].principal
        });
      }
      res.send({
        success: true,
        message: "Si encontro resultado",
        data: jsonArr,
      });
    }
  });
};

obtenerLugaresPorCategoria = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  let valor = req.body.idclasificacion;
  Lugar.obtenerLugaresPorCategoria(valor, (err, data) => {
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

       // let urlimagen = 'http://10.0.2.2:3000/' + data[i].primeraimagen;

       // let urlimagen =  process.env.CONF_URL+ data[i].primeraimagen;
        let urlimagen  ="";
        if(data[i].primeraimagen != null  ){
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
          primeraimagen: urlimagen,
          nombreclasificacion: data[i].nombreclasificacion,
          //imagenes : data[i].imagenes,
          //actividades : data[i].actividades,
          principal: data[i].principal
        });
      }
      res.send({
        success: true,
        message: "Si encontro resultado",
        data: jsonArr,
      });
    }
  });
};


obtenerLugaresDentroLugar = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  let valor = req.body.idlugar;
  Lugar.obtenerLugaresDentroLugar(valor, (err, data) => {
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

       // let urlimagen = 'http://10.0.2.2:3000/' + data[i].primeraimagen;
       let urlimagen 
       if(data[i].primeraimagen != null ){
  urlimagen =  process.env.CONF_URL+ data[i].primeraimagen;

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
          primeraimagen:  data[i].primeraimagen,
          nombreclasificacion: data[i].nombreclasificacion, 
          principal: data[i].principal
        });
      }
      res.send({
        success: true,
        message: "Si encontro resultado",
        data: jsonArr,
      });
    }
  });
};

obtenerDetalleLugar = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  let valor = req.body.idlugar;
  Lugar.obtenerDetalleLugar(valor, (err, data) => {
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

       // let urlimagen = 'http://10.0.2.2:3000/' + data[i].primeraimagen;

       // let urlimagen =  process.env.CONF_URL+ data[i].primeraimagen;
        let urlimagen  ="";
        if(data[i].primeraimagen != null  ){
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
          primeraimagen: urlimagen,
          nombreclasificacion: data[i].nombreclasificacion,
          //imagenes : data[i].imagenes,
          //actividades : data[i].actividades,
          principal: data[i].principal
        });
      }
      res.send({
        success: true,
        message: "Si encontro resultado",
        data: jsonArr,
      });
    }
  });
};




module.exports = {
  sliderPrincipal,
  sliderLugaresTops,
  sliderRutasTops,
  buscarLugaresActivos,
  obtenerImagenesLugar,
  obtenerLugaresDentroLugar,
  obtenerLugaresPorCategoria,
  obtenerDetalleLugar
}