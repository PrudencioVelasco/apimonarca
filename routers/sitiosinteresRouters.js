const sitiosInteresController = require('../controllers/sitiosinteresController'); 
module.exports = app => {   
    app.post("/monarca/sitiosinteres/obtenerSitiosInteresPorLugar", sitiosInteresController.obtenerSitiosInteresPorLugar); 
  
}
