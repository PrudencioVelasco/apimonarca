const sitiosInteresController = require('../controllers/sitiosinteresController'); 
module.exports = app => {   
    app.post("/monarca/sitiosinteres/obtenerSitiosInteresPorLugar", sitiosInteresController.obtenerSitiosInteresPorLugar); 
    app.post("/monarca/sitiosinteres/obtenerSitiosInteresPorLugarv2", sitiosInteresController.obtenerSitiosInteresPorLugarv2); 
  
}
