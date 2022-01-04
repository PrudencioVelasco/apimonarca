const dbConn = require('../config/config');
const ImagenComentarioLugar = function (row) {
    this.idimagencomentariolugar = row.idimagencomentariolugar;
    this.idcomentariolugar = row.idcomentariolugar;
    this.nombreimagen  = row.nombreimagen; 
    this.imagenurl  = row.imagenurl; 
};
const ImagenComentarioTour = function (row) {
  this.idimagencomentariotour = row.idimagencomentariotour;
  this.idcomentariotour = row.idcomentariotour;
  this.nombreimagen  = row.nombreimagen; 
  this.imagenurl  = row.imagenurl; 
};
const ImagenLugar= function (row){
  this.idimagenlugar = row.idimagenlugar;
  this.idlugar = row.idlugar;
  this.nombreimagen = row.nombreimagen;
  this.url = row.url;
  this.tipousuario = row.tipousuario;
  this.idusuario = row.idusuario;
  this.fecha = row.fecha;
}

const ImagenTour= function (row){
  this.idimagentour  = row.idimagentour ;
  this.idtour = row.idtour;
  this.nombreimagen = row.nombreimagen;
  this.url = row.url;
  this.tipousuario = row.tipousuario;
  this.idusuario = row.idusuario;
  this.fecha = row.fecha;
}

ImagenComentarioLugar.insertarImagenComentarioLugar = (newComentario, result) => {
    dbConn.query("INSERT INTO tblimagen_comentario_lugar SET ?", newComentario, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId });
      result(null, { id: res.insertId, ...newComentario });
    });
  }
  ImagenComentarioTour.insertarImagenComentarioTour = (newComentario, result) => {
    dbConn.query("INSERT INTO tblimagen_comentario_tour SET ?", newComentario, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId });
      result(null, { id: res.insertId, ...newComentario });
    });
  }
  ImagenLugar.insertFotosLugar = (newFoto, result) => {
    dbConn.query("INSERT INTO tblimagen_lugar SET ?", newFoto, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId });
      result(null, { id: res.insertId, ...newFoto });
    });
  }
  ImagenLugar.insertFotosTour = (newFoto, result) => {
    dbConn.query("INSERT INTO tblimagen_tour SET ?", newFoto, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId });
      result(null, { id: res.insertId, ...newFoto });
    });
  }
 
module.exports = {ImagenComentarioLugar,ImagenLugar,ImagenComentarioTour,ImagenTour}