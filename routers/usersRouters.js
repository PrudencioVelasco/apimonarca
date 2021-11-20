const userController = require('../controllers/usersController'); 
const {validarJWT} = require('../middlewares/validar-jwt');
module.exports = app => {  
    app.get('/monarca/usuario/renewtoken',validarJWT,userController.renewToken);
    app.post("/monarca/usuario/singInFacebook", userController.singInFacebook);  

}
