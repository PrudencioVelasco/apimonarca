const jwt = require('jsonwebtoken');

const validarJWT =(req,res,next)=>{
const token = req.header('x-token');
if(!token || token ==''){
    res.status(401).send({
        success: false,
        message: "No hay token en la peticion.",
      });
}
try {
    const {uid} = jwt.verify(token,process.env.JWT_KEY); 
    req.uid = uid;
   
    next();
} catch (error) {
    res.status(401).send({
        success: false,
        message: "Token no valido.",
      });
}
}
module.exports={
    validarJWT
}