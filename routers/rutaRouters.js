const rutasController = require('../controllers/rutasController'); 
module.exports = app => {  
    app.get("/monarca/ruta/todasRutasVisibles", rutasController.todasRutasVisibles); 
    app.get("/monarca/ruta/todasRutasPrincipales", rutasController.todasRutasPrincipales); 
    app.post("/monarca/ruta/obtenerLugaresRuta", rutasController.obtenerLugaresRuta); 
	app.post("/monarca/ruta/obtenerDetalleRuta", rutasController.obtenerDetalleRuta); 
	app.get("/monarca/ruta/rutasConLugares", rutasController.rutasConLugares);
  
}
