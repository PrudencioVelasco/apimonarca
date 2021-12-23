const dbConn = require('../config/config');
const Horario = function (horario) {
    this.idhorario = horario.idhorario;
    this.idcompania = horario.idcompania; 
    this.iddia = horario.iddia; 
    this.horainicial = horario.horainicial; 
    this.horafinal = horario.horafinal;  

}; 
Horario.obtenerHorario = (idcompania,result)=>{
    let sql = "SELECT h.idhorario,h.idcompania, d.iddia, d.nombredia, TIME_FORMAT(h.horainicial,'%h:%i %p') AS horainicial,TIME_FORMAT(h.horafinal,'%h:%i %p') AS horafinal "+
    "FROM tblhorario h INNER JOIN tbldia d ON d.iddia = h.iddia WHERE h.idcompania = ?";
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
  Horario.obtenerHorarioFiltrado = (idcompania,result)=>{
    var fecha = new Date();
    var numero_dia = fecha.getDay();
    var hora_actual = fecha.getHours()+":"+fecha.getMinutes();
    console.log(hora_actual);
    let sql = `SELECT h.idhorario,h.idcompania, d.iddia, d.nombredia, TIME_FORMAT(h.horainicial,'%h:%i %p') AS horainicial,TIME_FORMAT(h.horafinal,'%h:%i %p') AS horafinal FROM tblhorario h INNER JOIN tbldia d ON d.iddia = h.iddia WHERE h.idcompania = ? AND h.iddia = ? AND  hour(h.horainicial)<= hour(?) and hour(h.horafinal)>= hour(?)`;
    console.log(sql);
    dbConn.query(sql, [idcompania,numero_dia,hora_actual,hora_actual], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };
module.exports = Horario;