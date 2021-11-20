const atractivosController = require('../controllers/atractivoController'); 
module.exports = app => {  
    app.get("/monarca/atractivo/todosAtractivos", atractivosController.todosAtractivos); 
    app.post("/monarca/atractivo/obtenerAtractivosLugar", atractivosController.obtenerAtractivosLugar); 
  
}
