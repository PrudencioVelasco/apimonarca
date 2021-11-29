const tourController = require('../controllers/tourController'); 
module.exports = app => {  
    app.get("/monarca/tour/todosLosTours", tourController.todosLosTours); 
    app.post("/monarca/tour/todosLosLoves", tourController.todosLosLoves); 
    app.post("/monarca/tour/todosLosComentarios", tourController.todosLosComentarios);  
  
}
