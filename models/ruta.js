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
Ruta.todasRutasPrincipales = result => {
  dbConn.query("SELECT * FROM tblruta WHERE principal = 1", (err, res) => {
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
    let sql = "SELECT * FROM vwslugaresruta WHERE idruta = ? ORDER BY numero ASC";
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
  Ruta.detalleRuta = (idruta, result) => {
  //let email = usuario.email;
  //let password = usuario.password;
  let sql = "SELECT * FROM tblruta WHERE idruta = ?";
  dbConn.query(sql, [idruta], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
}
Ruta.rutasConLugares = result => {
    dbConn.query("select r.* from tblruta r inner join tblrutalugar rl on r.idruta = rl.idruta group  by r.idruta", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } 
        console.log("customers: ", res);
        result(null, res);
    });
};
module.exports = Ruta;