const telefonoController = require('../controllers/telefonoController'); 
module.exports = app => {  
    app.get("/monarca/telefono/todoLosTelefonos", telefonoController.todoLosTelefonos); 
    app.post("/monarca/telefono/telefonosCompania", telefonoController.telefonosCompania); 
  
}
