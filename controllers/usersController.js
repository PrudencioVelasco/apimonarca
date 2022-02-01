const https = require('https');
const FB = require('fb');
const { generarJWT } = require("../helpers/jwt");
const { User, RolUsuario } = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../config/key');
const aws = require('aws-sdk/clients/s3');
const path = require('path');
const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const token = await generarJWT(uid); 
  User.obtenerDatosUsuarioAplicacion(uid, async (err, data) => {
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
        token: token,
        data: data,
      });
    }
  })
}
singInFacebook = async (req, res, next) => {
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
    {
      "fields": "id,name,email,link,picture{url}",
      "access_token": req.body.authToken
    },
    function (response) {
      if (response.error) {
        res.status(500).send({
          success: false,
          message: "Ocurrio un error al obtener la informacion del token.",
          // data: jsonArr2,
        });
      } else {
        const usuario = new User({
          userName: response.name,
          userEmail: response.email,
          imageUrl: (response.picture.data.url != "") ? response.picture.data.url : "",
          uid: response.id,
          password: "",
          desde: 'facebook',
          joiningDate: new Date(),
          timestamp: new Date(),
          activo: 1,
          eliminado: 0,
        });
        //  console.log(response);

        //VALIDAR SI EL USUARIO ESTA REGISTRADO 
        User.validarExistenciaUsuario(response.id, async (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              //NO EXISTE EL USUARIO, SE REGISTRARA COMO NUEVO
              User.registrarUsuario(usuario, async (err, data) => {
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
                    token: token,
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
            User.updateUsuario(response.id, response.name, (response.picture.data.url != "") ? response.picture.data.url : "", async (err, data) => {
              if (err) {
                res.status(500).send({
                  success: false,
                  message:
                    err.message || "Ocurrio un error al asignarle el rol.",
                  error: err.message
                });
              } else {

                User.validarExistenciaUsuario(response.id, async (err, data) => {
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
                      token: token,
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

}
crearUsuarioCliente = (req, res) => {
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
    userName: req.body.nombre,
    userEmail: req.body.email,
    imageUrl: "",
    uid: "",
    password: encriptado,
    desde: 'web',
    joiningDate: new Date(),
    timestamp: new Date(),
    activo: 0,
    eliminado: 0,
  });
  User.validarCorreo(req.body.email,'web', async (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        User.registrarUsuario(usuario, (err, data) => {
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
              idusuario: data.id,
              idrol: 3,
            }
            );
            RolUsuario.registrarRolUsuario(usuario_rol, (err, datarol) => {
              if (err) {
                res.status(500).send({
                  success: false,
                  message:
                    err.message || "Ocurrio un error al asignarle el rol.",
                  error: err.message
                });
              } else {


                User.obtenerDatosUsuario(data.id, async (err, datau) => {
                  if (err) {
                    if (err.kind === "not_found") {
                      res.status(404).send({
                        success: false,
                        message: `Not found Customer with id ${data.id}.`
                      });
              
                    } else {
                      res.status(500).send({
                        success: false,
                        message: "Error retrieving Customer with id " + data.id
                      });
                    }
                  }
                  else {
                    //EXISTE EL REGISTRO EN LA BASE DE DATOS 
                    const dato_usuario = {
                      nombre:'',
                      email:''

                    };
                    const token = await generarJWT(data.id);
                    res.send({
                      success: true,
                      message: "Si encontro resultado",
                      token: token,
                      data: datau,
                    });
                  }
                }) 
                 
              }
            });

          }
        })
      } else {

        res.status(500).send({
          success: false,
          message: "Error retrieving Customer with id " + req.email
        });
      }
    } else {
      res.status.send({
        success: false,
        message: "El correo ya se encuentra registrado",
        token: "",
        data: "",
      });

    }

  })

}
loginUsuarioCliente = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }
  
  User.login(req.body.email,'web', async (err, data) => {
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
        res.status(404).send({
          success: false,
          message: "El usuario o contrasena son incorrectos.",
        });
      } else {
        const token = await generarJWT(data.idusuario);
         
        res.send({
          success: true,
          message: "Exito",
          token:token,
          data: data
        });
      }

    }
  });
}
modificarNombreUsario=(req,res)=>{
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  } 
  User.updateNombreUsuario(req.body.nombre,req.uid, (err, datarol) => {
    if (err) {
      res.status(500).send({
        success: false,
        message:
          err.message || "Ocurrio un error al asignarle el rol.",
        error: err.message
      });
    } else { 
      User.obtenerDatosUsuario(req.uid, async (err, datau) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              success: false,
              message: `Not found Customer with id ${req.uid}.`
            });
    
          } else {
            res.status(500).send({
              success: false,
              message: "Error retrieving Customer with id " + req.uid
            });
          }
        }
        else { 
          const token = await generarJWT(req.uid);
          res.send({
            success: true,
            message: "Si encontro resultado",
            token: token,
            data: datau,
          });
        }
      }) 
    }
  });
}
subirFotoPerfil = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  }
  var errores = 0;
  var exitos = 0; 
  const uploads = Object.values(req.files.fotos);
  uploads.forEach(async (upload) => {
    const fileName = `perfil_${req.uid}_${numeroAleatorio(0, 10012)}_${numeroAleatorio(0, 2000)}${path.parse(upload.name).ext}`;
    const fileType = upload.mimetype;
    const bucketName = process.env.AWS_BUCKET_NAME;
    const region = process.env.AWS_BUCKET_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY;
    const secretAccessKey = process.env.AWS_SECRET_KEY;
    const s3 = new aws({
      region,
      accessKeyId,
      secretAccessKey,
    });
    const uploadParams = {
      Bucket: bucketName,
      Body: upload.data,
      Key: fileName,
      ContentType: fileType,
    };
    var s3upload = s3.upload(uploadParams).promise();
    s3upload
      .then(function (data) {
        const url =  `https://${bucketName}.s3.amazonaws.com/${fileName}`; 
        User.updateFotoUsuario(req.uid,url, (err, data) => {
          if (err) {
            errores += 1;
          }
          else {
            exitos += 1;
          }
        });
      })
      .catch(function (err) {
        errores += 1;
      });
  });
  if (errores == 0) {
    res.send({
      success: true,
      message: "Se subieron las fotos con exito.",
      data: "",
    });
  } else {

    res.send({
      success: true,
      message: "Algunas fotos no fueron subidas!",
      data: "",
    });
  }
}
cambiarPasswordUsuario=(req,res)=>{
  if (!req.body) {
    res.status(400).send({
      success: false,
      message: "Content can not be empty!"
    });
  } 
  const encriptado = bcrypt.hashSync(req.body.password, 10);
  User.updateNombreUsuario(req.uid,encriptado, (err, datarol) => {
    if (err) {
      res.status(500).send({
        success: false,
        message:
          err.message || "Ocurrio un error al asignarle el rol.",
        error: err.message
      });
    } else { 
      User.obtenerDatosUsuario(req.uid, async (err, datau) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              success: false,
              message: `Not found Customer with id ${req.uid}.`
            });
    
          } else {
            res.status(500).send({
              success: false,
              message: "Error retrieving Customer with id " + req.uid
            });
          }
        }
        else { 
          const token = await generarJWT(req.uid);
          res.send({
            success: true,
            message: "Si encontro resultado",
            token: token,
            data: datau,
          });
        }
      }) 
    }
  });
}
module.exports = {
  renewToken,
  singInFacebook,
  crearUsuarioCliente,
  loginUsuarioCliente,
  cambiarPasswordUsuario,
  subirFotoPerfil,
  modificarNombreUsario
}