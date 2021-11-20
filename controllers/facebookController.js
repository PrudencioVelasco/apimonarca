/*const https = require('https');

router.post("/auth/facebook", (req, res, next) => {

  const options = {
    hostname: 'graph.facebook.com',
    port: 443,
    path: '/me?access_token=' + req.body.authToken,
    method: 'GET'
  }

  const request = https.get(options, response => {
    response.on('data', function (user) {
      user = JSON.parse(user.toString());
      console.log(user);
    });
  })

  request.on('error', (message) => {
    console.error(message);
  });

  request.end();
})*/
const https = require('https');
const FB = require('fb');
const {generarJWT} = require('../helpers/jwt')
const Usuario = require('../models/user'); 

singInFacebook  =  async (req, res,next)  => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        success: false,
        message: "Content can not be empty!"
      });
    }
  
    FB.api(
      '/me',
      'GET',
      {"fields":"id,name,email,link,picture{url}",
      "access_token": req.body.authToken},
      function(response) {
        if(response.error){
          res.status(500).send({
            success: false,
            message: "Ocurrio un error al obtener la informacion del token.",
           // data: jsonArr2,
          });
        }else{ 
          const usuario = new User({
            userName: req.body.email,
            userEmail: req.body.name,
            imageUrl:(response.picture.data.url !="")?response.picture.data.url:"",
            uid:response.id,
            desde:'facebook',
            joiningDate:  new Date(),
            timestamp: new Date()
          });
        
          //VALIDAR SI EL USUARIO ESTA REGISTRADO 
           Usuario.validarExistenciaUsuario(response.id, async (err, data)  => {
            if (err) {
              if (err.kind === "not_found") {
                //NO EXISTE EL USUARIO, SE REGISTRARA COMO NUEVO
                Usuario.registrarUsuario(usuario, async (err, data) => {
                  if (err) {
                    res.status(500).send({
                      success: false,
                      message:
                        err.message || "Ocurrio un error al asignarle el rol.",
                      error: err.message
                    });
                  } else {
                    const token = await generarJWT(data.id);
                    res.send({
                      success: true,
                      message: "Si encontro resultado",
                      token:token,
                      data: data,
                    });
                  }
                }); 
              } else {
                res.status(500).send({
                  success: false,
                  message: "Error retrieving Customer with id " + req.params.customerId
                });
              }
            } 
            else {
               //EXISTE EL REGISTRO EN LA BASE DE DATOS
            const token = await generarJWT(data.id);
              res.send({
                success: true,
                message: "Si encontro resultado",
                token:token,
                data: data,
              });
            }
          })

         // console.log(response);
          //  var myJson = JSON.parse(response);
          //console.log("mi variable: "+response["name"]);
              // Insert your code here
        }
      
      }
    );
    
  };
  
  module.exports = {
    singInFacebook
  }