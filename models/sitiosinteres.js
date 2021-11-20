const dbConn = require('../config/config');
const SitiosInteres = function (sitio) {
    this.idsitiointeres  = sitio.idsitiointeres ;
    this.idruta = sitio.idclasificacion;
    this.nombre = sitio.nombre; 
    this.descripcion = sitio.descripcion; 
};
 
SitiosInteres.obtenerSitiosInteres = (idlugar,result)=>{
    let sql = "SELECT * FROM tblsitiointeres WHERE idlugar = ?";
    dbConn.query(sql, [idlugar], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };
module.exports = SitiosInteres;