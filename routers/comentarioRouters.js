
const comentarioController = require('../controllers/comentarioController'); 
const { validarJWT } = require('../middlewares/validar-jwt');
module.exports = app => {  
    app.post("/monarca/comentario/obtenerComentariosPorLugar", comentarioController.obtenerComentariosPorLugar); 
    app.post("/monarca/comentario/obtenerComentariosLugarv2", comentarioController.obtenerComentariosLugarv2); 
    app.post("/monarca/comentario/agregarComentario",validarJWT, comentarioController.agregarComentario); 
    app.post("/monarca/comentario/agregarComentarioLugar",validarJWT,comentarioController.agregarComentarioLugar); 
    app.post("/monarca/comentario/eliminarComentario",validarJWT, comentarioController.deleteComentario);
    app.post("/monarca/comentario/eliminarComentariov2",validarJWT, comentarioController.eliminarComentariov2);
    app.post("/monarca/comentario/totalComentarioLugar", comentarioController.totalComentarioLugar); 
    app.post("/monarca/comentario/totalComentarioLugarUsuario", comentarioController.totalComentarioLugarUsuario);
    app.post("/monarca/comentario/agregarReporteComentarioLugar",validarJWT, comentarioController.agregarReporteComentarioLugar);  
  
}
