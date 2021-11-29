const dbConn = require('../config/config'); 
const User = function (usuario) {
  this.idusuario = usuario.idusuario;
  this.userName = usuario.userName;
  this.userEmail = usuario.userEmail;
  this.imageUrl = usuario.imageUrl;
  this.uid = usuario.uid;
  this.desde = usuario.desde;
  this.joiningDate = usuario.joiningDate;
  this.timestamp = usuario.timestamp; 

};

User.obtenerDatosUsuario = (idusuario,result)=>{ 
  let sql = "SELECT * FROM tbluser WHERE idusuario = ?";
  dbConn.query(sql,[idusuario], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

User.validarExistenciaUsuario = (uid,result)=>{ 
  let sql = "SELECT * FROM tbluser WHERE uid = ?";
  dbConn.query(sql,[uid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};
User.registrarUsuario = (newUsuario, result) => {
  dbConn.query("INSERT INTO tbluser SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId });
    result(null, { id: res.insertId, ...newUsuario });
  });
};
User.updateUsuario = (uid,nombre,imagen, result) => {
  //let email = usuario.email;
  //let password = usuario.password;
  let sql = "UPDATE tbluser SET userName = ?, imageUrl = ? WHERE uid = ?";
  dbConn.query(sql, [nombre,imagen,uid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("found customer: ", res[0]);
    result(null, true);
    return;
  });
};
/*
User.getAll = result => {
  dbConn.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};
User.create = (newUsuario, result) => {
  dbConn.query("INSERT INTO users SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId });
    result(null, { id: res.insertId, ...newUsuario });
  });
};
User.login = (email,result)=>{
  //let email = usuario.email;
  //let password = usuario.password;
  let sql = "SELECT * FROM users WHERE email = ?";
  dbConn.query(sql,[email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

User.login = (email,result)=>{ 
  let sql = "SELECT * FROM users WHERE email = ?";
  dbConn.query(sql,[email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  })
};*/
module.exports = User;