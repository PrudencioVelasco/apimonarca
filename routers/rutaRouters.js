const rutasController = require('../controllers/rutasController'); 
module.exports = app => {  
    app.get("/monarca/ruta/todasRutas", rutasController.todasRutas); 
    app.post("/monarca/ruta/obtenerLugaresRuta", rutasController.obtenerLugaresRuta); 
  
}
