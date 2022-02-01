const userController = require('../controllers/usersController'); 
const {validarJWT} = require('../middlewares/validar-jwt');
module.exports = app => {  
    app.get('/monarca/usuario/renewtoken',validarJWT,userController.renewToken);
    app.post("/monarca/usuario/singInFacebook", userController.singInFacebook);  
    app.post("/monarca/usuario/crearUsuarioCliente", userController.crearUsuarioCliente);
    app.post("/monarca/usuario/singInWeb", userController.loginUsuarioCliente);
    app.post("/monarca/usuario/cambiarPasswordUsuario",validarJWT, userController.cambiarPasswordUsuario);  
    app.post("/monarca/usuario/subirFotoPerfil",validarJWT, userController.subirFotoPerfil);  
    app.post("/monarca/usuario/modificarNombreUsario",validarJWT, userController.modificarNombreUsario);  

}
