const dbConn = require('../config/config'); 
const RolUsuario = function (rol) {
  this.id = rol.id;
  this.id_user = rol.id_user;
  this.id_rol = rol.id_rol; 
  this.create_at = rol.create_at;
  this.update_at = rol.update_at;

};
RolUsuario.create=(newRolUsuario, result) => {
    dbConn.query("INSERT INTO user_has_roles SET ?", newRolUsuario, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId });
      result(null, { id: res.insertId, ...newRolUsuario });
    });
  };

  module.exports = RolUsuario;