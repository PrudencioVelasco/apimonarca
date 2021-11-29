/*const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../config/key');
const RolUsuario = require('../models/rolusuario')
findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send({
      success: true,
      message: "Exito",
      data: data
    });
  });
};
// Create and Save a new Customer
create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }

  const encriptado = bcrypt.hashSync(req.body.password, 10);
  // Create a Customer
  const usuario = new User({
    email: req.body.email,
    name: req.body.name,
    lastname: req.body.lastname,
    phone: req.body.phone,
    password: encriptado,
    create_at: new Date(),
    update_at: new Date()
  });

  // Save Customer in the database
  User.create(usuario, (err, data) => {
    if (err) {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while creating the Customer.",
        error: err.message
      });
    }
    else {
      const usuario_rol = new RolUsuario({
        id_user: data.id,
        id_rol: 1,
        create_at: new Date(),
        update_at: new Date()
      }
      );
      RolUsuario.create(usuario_rol, (err, data) => {
        if (err) {
          res.status(500).send({
            success: false,
            message:
              err.message || "Ocurrio un error al asignarle el rol.",
            error: err.message
          });
        } else {
          res.send({
            success: true,
            message: "Registrado con exito!",
            data: data.id,
          });
        }
      });
      
    }
  });
};
login = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }
  
  User.login(req.body.email, (err, data) => {
    console.log(req.body.email);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          success: false,
          message: `Not found Customer with id ${req.body.email}.`
        });
      } else {
        res.status(500).send({
          success: false,
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else {
      let passwordEncriptado = data.password;
      // check account found and verify password
      if (!passwordEncriptado || !bcrypt.compareSync(req.body.password, passwordEncriptado)) {
        // authentication failed
        res.send({
          success: false,
          message: "El usuario o contrasena son incorrectos.",
        });
      } else {
        const tokengenerado = jwt.sign({ id: data.id, email: data.email }, keys.secretOrKey, {
          // expiresIn: (60*60*24) // 1 HORA
        });
        // authentication successful  
        const datausuario = {
          id: data.id,
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          phone: data.phone,
          image: data.image,
          session_token: `JWT ${tokengenerado}`
        }
        res.send({
          success: true,
          message: "Exito",
          data: datausuario
        });
      }

    }
  });
};

module.exports = {
  findAll,
  create,
  login
}*/
const https = require('https');
const FB = require('fb');
const { generarJWT } = require("../helpers/jwt");
const Usuario = require('../models/user'); 


const renewToken = async(req,res=response)=>{
const uid = req.uid; 
const token = await generarJWT(uid);
Usuario.obtenerDatosUsuario(uid, async (err, data)  => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        success: false,
        message: `Not found Customer with id ${uid}.`
      });
     
    } else {
      res.status(500).send({
        success: false,
        message: "Error retrieving Customer with id " + uid
      });
    }
  } 
  else {
     //EXISTE EL REGISTRO EN LA BASE DE DATOS 
    res.send({
      success: true,
      message: "Si encontro resultado",
      token:token,
      data: data,
    });
  }
})  
};
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
        const usuario = new Usuario({
          userName: response.name,
          userEmail: response.email,
          imageUrl:(response.picture.data.url !="")?response.picture.data.url:"",
          uid:response.id,
          desde:'facebook',
          joiningDate:  new Date(),
          timestamp: new Date()
        });
      //  console.log(response);
      
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
                //  console.log(data.id);
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
            Usuario.updateUsuario(response.id,response.name,(response.picture.data.url !="")?response.picture.data.url:"", async (err, data)  => {
              if (err) {
                res.status(500).send({
                  success: false,
                  message:
                    err.message || "Ocurrio un error al asignarle el rol.",
                  error: err.message
                });
              } else {
                
                Usuario.validarExistenciaUsuario(response.id, async (err, data)  => {
                   if (err) {
                          res.status(500).send({
                            success: false,
                            message:
                              err.message || "Ocurrio un error al asignarle el rol.",
                            error: err.message
                          });
                       
                  } 
                  else {
                    const token = await generarJWT(data.idusuario);
                    res.send({
                      success: true,
                      message: "Si encontro resultado",
                      token:token,
                      data: data,
                    });
                  }
                });
              //  console.log(data.id);
             
              
              }

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
module.exports={
  renewToken,
  singInFacebook
}