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
module.exports = Compania;