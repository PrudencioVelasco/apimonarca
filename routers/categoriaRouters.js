const categoriasController = require('../controllers/categoriasController'); 
module.exports = app => {  
    app.get("/monarca/categoria/todasCategorias", categoriasController.todasCategorias); 
    app.post("/monarca/categoria/categoriasPorLugar", categoriasController.categoriasPorLugar); 
}
