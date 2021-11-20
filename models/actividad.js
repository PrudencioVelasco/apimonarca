const dbConn = require('../config/config');
const Actividad = function (actividad) {
    this.idactividad = actividad.idactividad;
    this.nombreactivodad = actividad.nombreactivodad; 
};
Actividad.todasActividades = result => {
    dbConn.query("SELECT * FROM tblactividad ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } 
        console.log("customers: ", res);
        result(null, res);
    });
};
Actividad.obtenerActividadLugar = (idlugar,result)=>{
    let sql = "select "+
                  " la.idlugar, "+
                  " a.nombreactividad "+
                  " from "+
                  " tbllugaractividad la "+
                  " inner join tblactividad a on "+
                  " la.idactividad = a.idtipoactividad "+
                  "where la.idlugar  = ?";
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
module.exports = Actividad;