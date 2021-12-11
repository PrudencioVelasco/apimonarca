const lugaresController = require('../controllers/lugaresController'); 
module.exports = app => {  
    app.get("/monarca/lugar/sliderPrincipal", lugaresController.sliderPrincipal);
    app.get("/monarca/lugar/sliderLugaresTops", lugaresController.sliderLugaresTops);
    app.get("/monarca/lugar/sliderRutasTops", lugaresController.sliderRutasTops); 
    app.post("/monarca/lugar/buscarLugaresActivos", lugaresController.buscarLugaresActivos); 
    app.post("/monarca/lugar/obtenerImagenesLugar", lugaresController.obtenerImagenesLugar); 
    app.post("/monarca/lugar/obtenerLugaresDentroLugar", lugaresController.obtenerLugaresDentroLugar); 
    app.post("/monarca/lugar/obtenerLugaresPorCategoria", lugaresController.obtenerLugaresPorCategoria);
    app.get("/monarca/lugar/obtenerDetalleLugar", lugaresController.obtenerDetalleLugar);
    app.post("/monarca/lugar/buscarLugaresActivosIn", lugaresController.buscarLugaresActivosIn);
  
}
