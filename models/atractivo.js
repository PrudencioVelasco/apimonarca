const dbConn = require('../config/config');
const Atractivo = function (atractivo) {
    this.idatractivo = atractivo.idatractivo;
    this.nombreatractivo = atractivo.nombreatractivo; 
};
Atractivo.todosAtractivos = result => {
    dbConn.query("SELECT * FROM tblatractivo ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } 
        console.log("customers: ", res);
        result(null, res);
    });
};
Atractivo.obtenerAtractivosLugar = (idlugar,result)=>{
    let sql = "select "+
                "    a.idatractivo, "+
                "    a.nombreatractivo "+
                "from "+
                "    tblatractivo a "+
                "inner join tbllugaratractivo la on "+
                "    a.idatractivo = la.idatractivo "+
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
module.exports = Atractivo;