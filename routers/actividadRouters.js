const actividadesController = require('../controllers/actividadController'); 
module.exports = app => {  
    app.get("/monarca/ruta/todasActividades", actividadesController.todasActividades); 
    app.post("/monarca/actividad/obtenerActividadLugar", actividadesController.obtenerActividadLugar); 
  
}
