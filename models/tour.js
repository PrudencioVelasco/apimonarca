const dbConn = require('../config/config');
const Tour = function (tour) {
    this.idtour = tour.idtour;
    this.idcompania = tour.idcompania;
    this.nombre = tour.nombre;
    this.descripcion = tour.descripcion;
    this.incluye = tour.incluye;
    this.actividad = tour.actividad;
    this.precioxpersona = tour.precioxpersona;
    this.horainicio = tour.horainicio;
    this.fechainicio = tour.fechainicio;
    this.horafinal = tour.horafinal; 
    this.fechafinal = tour.fechafinal; 
    this.activo = tour.activo;  
};
Tour.todosLosTours =(texto,result) => {
   let   sql = `SELECT * FROM vwtours `;
   if(texto!=""){
    sql += ` where (nombre like '%${texto}%' or descripcion like '%${texto}%' or informacion like '%${texto}%' or actividad like '%${texto}%')`;
   }
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
Tour.todosLosLoves = (idtour,result) => {
    var sql ="SELECT * FROM tbllove_tour WHERE idtour = ?";
    dbConn.query(sql, [idtour], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } 
        console.log("customers: ", res);
        result(null, res);
    });
};

Tour.todosLosComentarios = (idtour,result) => {
      var sql ="SELECT * FROM tblcomentariotour WHERE idtour = ?";
    dbConn.query(sql, [idtour], (err, res) => { 
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } 
        console.log("customers: ", res);
        result(null, res);
    });
};
module.exports = Tour;