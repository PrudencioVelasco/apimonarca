const { Comentario, ComentarioLugar, ReporteComentarioLugar, ComentarioTour, ReporteComentarioTour } = require('../models/comentario');
const {ImagenComentarioLugar,ImagenLugar,ImagenComentarioTour,ImagenTour} = require('../models/imagen_comentarios');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../config/key');
const aws = require('aws-sdk/clients/s3');
const path = require('path');
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
}
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
    idcausareporte: req.body.idcausareporte,
    comentario: req.body.comentario,
    idusuario: req.uid,
    fecharegistro: new Date(),
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
}
agregarReporteComentarioTour = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  const reporte = new ReporteComentarioTour({
    idcomentario: req.body.idcomentario,
    idcausareporte: req.body.idcausareporte,
    comentario: req.body.comentario,
    idusuario: req.uid,
    fecharegistro: new Date(),
    atendido: 0,
    eliminado: 0
  });

  // Save Customer in the database
  Comentario.insertarReporteComentarioTour(reporte, (err, data) => {
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
}
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
    idconquienvisito: req.body.idconquienvisito,
    rating: req.body.rating,
    comentario: req.body.comentario,
    fechavisito: req.body.fechavisito,
    eliminado: 0,
    fecharegistro: new Date(),
    idusuario: req.uid,
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
}
agregarComentarioTour = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  const comentario = new ComentarioTour({
    idtour: req.body.idtour,
    idconquienvisito: req.body.idconquienvisito,
    rating: req.body.rating,
    comentario: req.body.comentario,
    fechavisito: req.body.fechavisito,
    eliminado: 0,
    fecharegistro: new Date(),
    idusuario: req.uid,
  });

  // Save Customer in the database
  Comentario.insertarComentarioTour(comentario, (err, data) => {
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
}
 numeroAleatorio = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
subirFotosComentarioLugar = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }
  var errores = 0;
  var exitos = 0;
  const idcomentario = req.body.idcomentario;
  const uploads = Object.values(req.files.multipartFiles);
  uploads.forEach(async (upload) => {
    const fileName = `photo_${numeroAleatorio(0, 10012)}_${numeroAleatorio(0, 2000)}${path.parse(upload.name).ext}`;
    const fileType = upload.mimetype;
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
      Body: upload.data,
      Key: fileName,
      ContentType: fileType,
    };
    var s3upload = s3.upload(uploadParams).promise();
    s3upload
      .then(function (data) {
        const imagen = new ImagenComentarioLugar({
          idcomentariolugar: idcomentario,
          nombreimagen: fileName,
          imagenurl: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
        });
        ImagenComentarioLugar.insertarImagenComentarioLugar(imagen, (err, data) => {
          if (err) {
            errores += 1;
          }
          else {
            exitos += 1;
          }
        });
      })
      .catch(function (err) {
        errores += 1;
      });
  });
  if (errores == 0) {
    res.send({
      success: true,
      message: "Se subieron las fotos con exito.",
      data: "",
    });
  } else {

    res.send({
      success: true,
      message: "Algunas fotos no fueron subidas!",
      data: "",
    });
  }
}
subirFotosComentarioTour = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }
  var errores = 0;
  var exitos = 0;
  const idcomentariotour = req.body.idcomentariotour;
  const uploads = Object.values(req.files.multipartFiles);
  uploads.forEach(async (upload) => {
    const fileName = `photo_${numeroAleatorio(0, 10012)}_${numeroAleatorio(0, 2000)}${path.parse(upload.name).ext}`;
    const fileType = upload.mimetype;
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
      Body: upload.data,
      Key: fileName,
      ContentType: fileType,
    };
    var s3upload = s3.upload(uploadParams).promise();
    s3upload
      .then(function (data) {
        const imagen = new ImagenComentarioTour({
          idcomentariotour: idcomentariotour,
          nombreimagen: fileName,
          imagenurl: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
        });
        ImagenComentarioTour.insertarImagenComentarioTour(imagen, (err, data) => {
          if (err) {
            errores += 1;
          }
          else {
            exitos += 1;
          }
        });
      })
      .catch(function (err) {
        errores += 1;
      });
  });
  if (errores == 0) {
    res.send({
      success: true,
      message: "Se subieron las fotos con exito.",
      data: "",
    });
  } else {

    res.send({
      success: true,
      message: "Algunas fotos no fueron subidas!",
      data: "",
    });
  }
}
subirFotosLugar=(req, res)=>{
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }
  var errores = 0;
  var exitos = 0;
  const idlugar = req.body.idlugar;
  const idusuario = req.uid;
  const uploads = Object.values(req.files.multipartFiles);
  uploads.forEach(async (upload) => {
    const fileName = `photo_${numeroAleatorio(0, 10012)}_${numeroAleatorio(0, 2000)}${path.parse(upload.name).ext}`;
    const fileType = upload.mimetype;
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
      Body: upload.data,
      Key: fileName,
      ContentType: fileType,
    };
    var s3upload = s3.upload(uploadParams).promise();
    s3upload
      .then(function (data) {
        const imagen = new ImagenLugar({ 
          idlugar :idlugar,
          nombreimagen : fileName,
          url : `https://${bucketName}.s3.amazonaws.com/${fileName}`,
          tipousuario :0,
          idusuario :idusuario,
          fecha: new Date(),
        
        });
        ImagenLugar.insertFotosLugar(imagen, (err, data) => {
          if (err) {
            errores += 1;
          }
          else {
            exitos += 1;
          }
        });
      })
      .catch(function (err) {
        errores += 1;
      });
  });
  if (errores == 0) {
    res.send({
      success: true,
      message: "Se subieron las fotos con exito.",
      data: "",
    });
  } else {

    res.send({
      success: true,
      message: "Algunas fotos no fueron subidas!",
      data: "",
    });
  }
}
subirFotosTour=(req, res)=>{
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }
  var errores = 0;
  var exitos = 0;
  const idtour = req.body.idtour;
  const idusuario = req.uid;
  const uploads = Object.values(req.files.multipartFiles);
  uploads.forEach(async (upload) => {
    const fileName = `photo_${numeroAleatorio(0, 10012)}_${numeroAleatorio(0, 2000)}${path.parse(upload.name).ext}`;
    const fileType = upload.mimetype;
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
      Body: upload.data,
      Key: fileName,
      ContentType: fileType,
    };
    var s3upload = s3.upload(uploadParams).promise();
    s3upload
      .then(function (data) {
        const imagen = new ImagenTour({ 
          idtour :idtour,
          nombreimagen : fileName,
          url : `https://${bucketName}.s3.amazonaws.com/${fileName}`,
          tipousuario :0,
          idusuario :idusuario,
          fecha: new Date(),
        
        });
        ImagenTour.insertFotosTour(imagen, (err, data) => {
          if (err) {
            errores += 1;
          }
          else {
            exitos += 1;
          }
        });
      })
      .catch(function (err) {
        errores += 1;
      });
  });
  if (errores == 0) {
    res.send({
      success: true,
      message: "Se subieron las fotos con exito.",
      data: "",
    });
  } else {

    res.send({
      success: true,
      message: "Algunas fotos no fueron subidas!",
      data: "",
    });
  }
}
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
  Comentario.obtenerComentariosPorLugar(idlugar, idcomentario, limite, (err, data) => {
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
obtenerComentariosLugar = (req, res) => {
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
  Comentario.obtenerComentariosLugar(idlugar, idcomentario, limite, (err, data) => {
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
obtenerComentariosLugarAdmin = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  let idlugar = req.body.idlugar; 
  Comentario.comentariosLugarAdmin(idlugar,  (err, data) => {
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
}
eliminarComentarioTour = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  let valor = req.body.idcomentario;
  Comentario.eliminarComentarioTour(valor, (err, data) => {
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
}
eliminarComentarioLugar = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  let valor = req.body.idcomentario;
  Comentario.eliminarComentarioLugar(valor, (err, data) => {
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
}
eliminarComentarioCompania = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  let valor = req.body.idcomentario;
  Comentario.eliminarComentarioCompania(valor, (err, data) => {
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
}
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
}
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
}
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
  Comentario.totalComentarioLugarUsuario(idlugar, idusuario, (err, data) => {
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
}
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
  Comentario.obtenerComentariosTour(idtour, idcomentario, limite, (err, data) => {
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
obtenerComentariosCompania = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  let idcompania = req.body.idcompania;
  let idcomentario = req.body.idcomentario;
  let limite = req.body.limite;
  Comentario.obtenerComentariosCompania(idcompania, idcomentario, limite, (err, data) => {
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
module.exports = {
  deleteComentario,
  agregarComentario,
  obtenerComentariosPorLugar,
  totalComentarioLugar,
  totalComentarioLugarUsuario,
  agregarComentarioLugar,
  subirFotosComentarioLugar,
  subirFotosLugar,
  obtenerComentariosLugar,
  eliminarComentariov2,
  eliminarComentarioLugar,
  eliminarComentarioTour,
  agregarReporteComentarioLugar,
  agregarComentarioTour,
  agregarReporteComentarioTour,
  obtenerComentariosTour,
  subirFotosComentarioTour,
  subirFotosTour,
  eliminarComentarioCompania,
  obtenerComentariosCompania,
  obtenerComentariosLugarAdmin
}