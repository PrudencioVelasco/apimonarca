const dbConn = require('../config/config');
const ImagenCompania = function (imagen) {
    this.idimagencompania = imagen.idimagencompania;
    this.idcompania = imagen.idcompania; 
    this.nombreimagen = imagen.nombreimagen; 
    this.url = imagen.url; 
    this.tipousuario = imagen.tipousuario;  
    this.idusuario = imagen.idusuario;  
    this.fecha = imagen.fecha;  

}; 
ImagenCompania.obtenerImagenes = (idcompania,result)=>{
    let sql = "SELECT * FROM tblimagen_compania ic WHERE  ic.idcompania = ?";
    dbConn.query(sql, [idcompania], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };
module.exports = ImagenCompania;