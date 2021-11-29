const causaReporteController = require('../controllers/causaReporteController'); 
module.exports = app => {  
    app.get("/monarca/causareporte/todasCausasReportes", causaReporteController.todasCausasReportes);  
  
}
