const loveController = require('../controllers/loveController'); 
const { validarJWT } = require('../middlewares/validar-jwt');
module.exports = app => {  
    app.post("/monarca/love/totalLoveLugarUsuario",validarJWT, loveController.totalLoveLugarUsuario);
    app.post("/monarca/love/totalLoveTourUsuario",validarJWT, loveController.totalLoveTourUsuario);
    app.post("/monarca/love/agregarLove",validarJWT, loveController.agregarLove);  
    app.post("/monarca/love/eliminarLove",validarJWT, loveController.eliminarLove);  
    app.post("/monarca/love/totalLove", loveController.totalLove);
    app.post("/monarca/love/totalLoveTour", loveController.totalLoveTour);  
    app.post("/monarca/love/agregarLoveTour",validarJWT, loveController.agregarLoveTour); 
    app.post("/monarca/love/eliminarLoveTour",validarJWT, loveController.eliminarLoveTour); 
  
}
