const dbConn = require('../config/config');
const Compania = function (compania) {
    this.idclasificacion = compania.idclasificacion;
    this.nombreclasificacion = compania.nombreclasificacion;
    this.rfc = compania.rfc;
    this.logotipo = compania.logotipo; 
    this.paginaweb = compania.paginaweb;
    this.nombre = compania.nombre;
    this.actividad = compania.actividad;
    this.direccion = compania.direccion;
    this.correo = compania.correo;
    this.contacto = compania.contacto;
    this.telefonos = compania.telefonos;
    this.horarios = compania.horarios;
    this.tours = compania.tours;
    this.imagenestour = compania.imagenestour;
    this.imagenescompania = compania.imagenescompania;

};
Compania.showAllCompanies = result => {
    dbConn.query("SELECT * FROM vwcompania ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } 
        console.log("customers: ", res);
        result(null, res);
    });
}; 
Compania.mostrarCompaniasXClasificacion  = (idclasificacion ,result)=>{
    let sql = "SELECT * FROM vwcompania WHERE idclasificacion  = ?";
    dbConn.query(sql, [idclasificacion ], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };
  Compania.mostrarCompaniasCercano  = (idclasificacion, latitud, longitud ,result)=>{
    let sql = `SELECT c.*,111.111 *
    DEGREES(ACOS(LEAST(1.0, COS(RADIANS(c.latitud))
         * COS(RADIANS(${latitud}))
         * COS(RADIANS(c.longitud - ${longitud}))
         + SIN(RADIANS(c.latitud))
         * SIN(RADIANS(${latitud}))))) AS distancia FROM vwcompania c WHERE c.idclasificacion  = ${idclasificacion} AND  c.latitud != 0 AND c.longitud != 0  HAVING distancia < 100.0`;
    dbConn.query(sql, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };
  
  Compania.detalleCompania = (idcompania,result)=>{ 
    let sql = "SELECT * FROM vwcompania WHERE idcompania = ?";
    dbConn.query(sql,[idcompania], (err, res) => {
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
  };
  Compania.buscarCompania = (idclasificacion,valor,result) => {
    let sql = `select * from vwcompania where idclasificacion = '${idclasificacion}' and concat(LOWER(nombre),LOWER(direccion),LOWER(actividad)) like LOWER('%${valor}%') `;
    dbConn.query(sql, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };
module.exports = Compania;