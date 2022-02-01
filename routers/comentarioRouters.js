const fileUpload = require('express-fileupload');
const{Router}= require('express');
const comentarioController = require('../controllers/comentarioController'); 
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

module.exports = app => {

    app.post("/monarca/comentario/obtenerComentariosPorLugar", comentarioController.obtenerComentariosPorLugar); 
    app.post("/monarca/comentario/agregarComentario",validarJWT, comentarioController.agregarComentario); 
    
    app.post("/monarca/comentario/obtenerComentariosLugar", comentarioController.obtenerComentariosLugar); 
    app.post("/monarca/comentario/agregarComentarioLugar",validarJWT,comentarioController.agregarComentarioLugar); 
    app.put("/monarca/comentario/subirFotosComentarioLugar",validarJWT,comentarioController.subirFotosComentarioLugar); 
    app.put("/monarca/comentario/subirFotosLugar",validarJWT,comentarioController.subirFotosLugar); 
    app.post("/monarca/comentario/eliminarComentarioLugar",validarJWT, comentarioController.eliminarComentarioLugar);
    app.post("/monarca/comentario/agregarReporteComentarioLugar",validarJWT, comentarioController.agregarReporteComentarioLugar);  
   
    app.post("/monarca/comentario/eliminarComentario",validarJWT, comentarioController.deleteComentario);
    app.post("/monarca/comentario/eliminarComentariov2",validarJWT, comentarioController.eliminarComentariov2);
    app.post("/monarca/comentario/totalComentarioLugar", comentarioController.totalComentarioLugar); 
    app.post("/monarca/comentario/totalComentarioLugarUsuario", comentarioController.totalComentarioLugarUsuario);
   
    app.post("/monarca/comentario/agregarComentarioTour",validarJWT,comentarioController.agregarComentarioTour); 
    app.post("/monarca/comentario/obtenerComentariosTour",comentarioController.obtenerComentariosTour);  
    app.post("/monarca/comentario/eliminarComentarioTour",validarJWT, comentarioController.eliminarComentarioTour);
    app.post("/monarca/comentario/agregarReporteComentarioTour",validarJWT, comentarioController.agregarReporteComentarioTour);  
    app.put("/monarca/comentario/subirFotosComentarioTour",validarJWT,comentarioController.subirFotosComentarioTour); 
    app.put("/monarca/comentario/subirFotosTour",validarJWT,comentarioController.subirFotosTour); 

    app.post("/monarca/comentario/obtenerComentariosCompania",comentarioController.obtenerComentariosCompania);  
    app.post("/monarca/comentario/eliminarComentarioCompania",validarJWT, comentarioController.eliminarComentarioCompania);  
  
    app.post("/monarca/comentario/obtenerComentariosLugarAdmin", comentarioController.obtenerComentariosLugarAdmin); 
   

}
