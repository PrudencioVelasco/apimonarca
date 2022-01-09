const dbConn = require('../config/config');
const Ruta = function (ruta) {
    this.idruta = ruta.idlugar;
    this.idclasificacion = ruta.idclasificacion;
    this.nombre = ruta.nombre;
    this.imagen = ruta.imagen;
    this.descripcion = ruta.descripcion; 
};
Ruta.todasRutasVisibles = result => {
    dbConn.query("SELECT * FROM tblruta WHERE visible = 1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } 
        console.log("customers: ", res);
        result(null, res);
    });
};
Ruta.obtenerLugaresRuta = (idruta,result)=>{
    let sql = "SELECT * FROM vwslugaresruta WHERE idruta = ?";
    dbConn.query(sql, [idruta], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };
module.exports = Ruta;