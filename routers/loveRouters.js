const loveController = require('../controllers/loveController'); 
const { validarJWT } = require('../middlewares/validar-jwt');
module.exports = app => {  
    app.post("/monarca/love/totalLoveLugarUsuario",validarJWT, loveController.totalLoveLugarUsuario);
    app.post("/monarca/love/agregarLove",validarJWT, loveController.agregarLove);  
    app.post("/monarca/love/eliminarLove",validarJWT, loveController.eliminarLove);  
    app.post("/monarca/love/totalLove", loveController.totalLove);  
  
}
