const conQuienVisitoController = require('../controllers/conQuienVisitoController'); 
module.exports = app => {  
    app.get("/monarca/conquienvisito/todosConQuienVisito", conQuienVisitoController.todosConQuienVisito);  
  
}
