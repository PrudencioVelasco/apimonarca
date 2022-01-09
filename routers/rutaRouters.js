const rutasController = require('../controllers/rutasController'); 
module.exports = app => {  
    app.get("/monarca/ruta/todasRutasVisibles", rutasController.todasRutasVisibles); 
    app.post("/monarca/ruta/obtenerLugaresRuta", rutasController.obtenerLugaresRuta); 
  
}
