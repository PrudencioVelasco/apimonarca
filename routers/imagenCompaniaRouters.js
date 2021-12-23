const imagen = require('../controllers/imagenCompaniaController'); 
module.exports = app => {    
    app.post("/monarca/imagencompania/obtenerImagenes", imagen.obtenerImagenes); 
  
}
