const User = require('../models/user'); 
const {Lugar,ImagenLugar,ClasificacionLugar} = require('../models/lugar');
const Ruta = require('../models/ruta'); 
const aws = require('aws-sdk/clients/s3');
const path = require('path');
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
      res.send({
        success: true,
        message: "Si encontro resultado",
        data: data,
      });
    }
  });
}
obtenerLugares = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  Lugar.obtenerLugares(req.body.page, (err, data) => {
    if (err) {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }
    else {
      const total = data.length;
      res.send({
        success: true,
        message: "Si encontro resultado",
        total_por_pagina:total,
        numero_pagina:req.body.page,
        data: data,
      });
    }
  });
}
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
      res.send({
        success: true,
        message: "Si encontro resultado",
        data: data,
      });
    }
  });
}
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
      res.send({
      success: true,
      message: "Exito",
      data: data
    });
  }
  });
}
lugaresDentroSliders = (req, res) => {
  Lugar.lugaresDentroSliders((err, data) => {
    if (err){
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }
    else { 
      res.send({
      success: true,
      message: "Exito",
      data: data
    });
  }
  });
}
obtenerTodosLugares = (req, res) => {
  Lugar.obtenerTodosLugares((err, data) => {
    if (err){
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }
    else {
       
      res.send({
      success: true,
      message: "Exito",
      data: data
    });
  }
  });
}
obtenerClasificacionLugar = (req, res) => {
  ClasificacionLugar.clasificaciones((err, data) => {
    if (err){
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }
    else {
       
      res.send({
      success: true,
      message: "Exito",
      data: data
    });
  }
  });
}
obtenerTodosLugaresCercanos = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

 
  Lugar.obtenerTodosLugaresCercano(req.body.latitud,req.body.longitud, (err, data) => {
    if (err){
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    }
    else {
       
      res.send({
      success: true,
      message: "Exito",
      data: data
    });
  }
  });
}
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
}
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
      res.send({
        success: true,
        message: "Si encontro resultado",
        data: data,
      });
    }
  });
}
buscarLugaresActivosIn = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  let valor = req.body.idslugares;
  Lugar.buscarLugaresActivosIn(valor, (err, data) => {
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
}
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
}
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
}
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
      res.send({
        success: true,
        message: "Si encontro resultado",
        data: data,
      });
    }
  });
}
subirPhotoLugar = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }
  const nombrelugar = req.body.nombrelugar;
 // console.log(req.files);
 // const upload = Object.values(req.files); 
  console.log(req.files.file.name);
    const fileName = `${nombrelugar.replace(/ /g, "")}_${req.uid}_${numeroAleatorio(0, 10012)}_${numeroAleatorio(0, 2000)}${path.parse(req.files.file.name).ext}`;
    const fileType = req.files.file.mimetype;
    const bucketName = process.env.AWS_BUCKET_NAME;
    const region = process.env.AWS_BUCKET_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY;
    const secretAccessKey = process.env.AWS_SECRET_KEY;
    const s3 = new aws({
      region,
      accessKeyId,
      secretAccessKey,
    });
    const uploadParams = {
      Bucket: bucketName,
      Body: req.files.file.data,
      Key: fileName,
      ContentType: fileType,
    };
    var s3upload = s3.upload(uploadParams).promise();
    s3upload
      .then(function (data) {
        const imagen = new ImagenLugar({
          idlugar:req.body.idlugar,
          nombreimagen: fileName, 
          url: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
          tipousuario :1,
          idusuario :req.uid,
          fecha: new Date(),
        });
        ImagenLugar.subirFotosLugar(imagen, (err, data) => {
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
      })
      .catch(function (err) {
        console.log(err);
        res.status(404).send({
          success: false,
          message: err,
          data: err,
        });
      });
 
  
}



module.exports = {
  sliderPrincipal,
  sliderLugaresTops,
  sliderRutasTops,
  buscarLugaresActivos,
  obtenerImagenesLugar,
  obtenerLugaresDentroLugar,
  obtenerLugaresPorCategoria,
  obtenerDetalleLugar,
  buscarLugaresActivosIn, 
  obtenerTodosLugares,
  obtenerTodosLugaresCercanos,
  obtenerLugares,
  subirPhotoLugar,
  obtenerClasificacionLugar,
  lugaresDentroSliders
}