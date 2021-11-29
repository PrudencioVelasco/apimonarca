const categoriasController = require('../controllers/categoriasController'); 
module.exports = app => {  
    app.get("/monarca/categoria/todasCategorias", categoriasController.todasCategorias); 
    app.get("/monarca/categoria/todasCategoriasPrincipal", categoriasController.todasCategoriasPrincipal); 
    app.post("/monarca/categoria/categoriasPorLugar", categoriasController.categoriasPorLugar); 
}
