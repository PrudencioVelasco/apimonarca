const lugaresController = require('../controllers/lugaresController'); 

const {validarJWT} = require('../middlewares/validar-jwt');
module.exports = app => {  
    app.get("/monarca/lugar/sliderPrincipal", lugaresController.sliderPrincipal);
    app.get("/monarca/lugar/obtenerLugares", lugaresController.obtenerLugares);
    app.get("/monarca/lugar/sliderLugaresTops", lugaresController.sliderLugaresTops);
	app.get("/monarca/lugar/lugaresDentroSliders", lugaresController.lugaresDentroSliders);
    app.get("/monarca/lugar/sliderRutasTops", lugaresController.sliderRutasTops); 
    app.post("/monarca/lugar/buscarLugaresActivos", lugaresController.buscarLugaresActivos); 
    app.post("/monarca/lugar/obtenerImagenesLugar", lugaresController.obtenerImagenesLugar); 
    app.post("/monarca/lugar/obtenerLugaresDentroLugar", lugaresController.obtenerLugaresDentroLugar); 
    app.post("/monarca/lugar/obtenerLugaresPorCategoria", lugaresController.obtenerLugaresPorCategoria);
    app.post("/monarca/lugar/obtenerDetalleLugar", lugaresController.obtenerDetalleLugar);
    app.post("/monarca/lugar/buscarLugaresActivosIn", lugaresController.buscarLugaresActivosIn);
    app.get("/monarca/lugar/obtenerTodosLugares", lugaresController.obtenerTodosLugares);
    app.post("/monarca/lugar/obtenerTodosLugaresCercanos", lugaresController.obtenerTodosLugaresCercanos);
    app.post("/monarca/lugar/subirPhotoLugar", validarJWT,lugaresController.subirPhotoLugar);
    app.get("/monarca/lugar/obtenerClasificacionLugar" ,lugaresController.obtenerClasificacionLugar);
   // app.post("/monarca/lugar/obtenerImagenesLugar", validarJWT,lugaresController.obtenerImagenesLugar);


  
}
