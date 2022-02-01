const companiaController = require('../controllers/companiaController'); 
const { validarJWT } = require('../middlewares/validar-jwt');
module.exports = app => {  
    app.get("/monarca/compania/showAllCompanies", companiaController.showAllCompanies); 
    app.post("/monarca/compania/mostrarCompaniasXClasificacion", companiaController.mostrarCompaniasXClasificacion); 
    app.post("/monarca/compania/detallecompania", companiaController.detalleCompania); 
    app.post("/monarca/compania/buscarCompania", companiaController.buscarCompania); 
    app.post("/monarca/compania/mostrarCompaniasCercano", companiaController.mostrarCompaniasCercano); 
    app.post("/monarca/compania/companiasPorUsuario",validarJWT, companiaController.companiasPorUsuario);
}
