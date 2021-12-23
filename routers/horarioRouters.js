const horarioController = require('../controllers/horarioController'); 
module.exports = app => {    
    app.post("/monarca/horario/obtenerHorario", horarioController.obtenerHorario); 
    app.post("/monarca/horario/obtenerHorarioFiltrado", horarioController.obtenerHorarioFiltrado); 
  
}
