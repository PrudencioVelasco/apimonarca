const dbConn = require('../config/config');
const Telefono = function (telefono) {
    this.idtelefono = telefono.idtelefono;
    this.idcompania = telefono.idcompania;
    this.numerotelefono = telefono.numerotelefono; 
};
Telefono.todoLosTelefonos = result => {
    dbConn.query("SELECT * FROM tbltelefono ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } 
        console.log("customers: ", res);
        result(null, res);
    });
}; 
Telefono.telefonosCompania = (idcompania,result)=>{
    let sql = "SELECT * FROM tbltelefono WHERE idcompania = ?";
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
module.exports = Telefono;