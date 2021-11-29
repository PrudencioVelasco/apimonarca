const companiaController = require('../controllers/companiaController'); 
module.exports = app => {  
    app.get("/monarca/compania/showAllCompanies", companiaController.showAllCompanies); 
    app.post("/monarca/compania/mostrarCompaniasXClasificacion", companiaController.mostrarCompaniasXClasificacion); 
    app.post("/monarca/compania/detallecompania", companiaController.detalleCompania); 

}
