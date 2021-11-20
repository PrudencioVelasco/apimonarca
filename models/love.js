const dbConn = require('../config/config');
const Love = function (love) {
    this.idlove = love.idlove;
    this.idlugar = love.idlugar; 
    this.idusuario = love.idusuario; 
};
Love.totalLove = (idlugar,result) => {
  dbConn.query("SELECT COUNT(l.idlove) as totallove FROM tbllove l WHERE l.idlugar = ?",[idlugar], (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(null, err);
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
Love.totalLoveLugarUsuario = (idlugar,idusuario,result) => {
    dbConn.query("SELECT COUNT(l.idlove) as totallove FROM tbllove l WHERE l.idlugar = ? AND l.idusuario=?",[idlugar,idusuario], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
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

Love.registrarLove = (newRegistro, result) => {
    dbConn.query("INSERT INTO tbllove  SET ?", newRegistro, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId });
      result(null, { id: res.insertId, ...newRegistro });
    });
  };
  Love.eliminarLove = (idlugar,idusuario,result) => {
    dbConn.query("DELETE FROM tbllove  WHERE idlugar = ? AND idusuario=?",[idlugar,idusuario], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }  
         //   console.log("found customer: ", res[0]);
            result(null, true);
            return;
          
    });
}; 
module.exports = Love;