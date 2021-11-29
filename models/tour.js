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
Tour.todosLosTours = result => {
    dbConn.query("SELECT * FROM vwtours", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } 
        console.log("customers: ", res);
        result(null, res);
    });
};
Tour.todosLosLoves = result => {
    dbConn.query("SELECT * FROM tbllove_tour", (err, res) => {
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