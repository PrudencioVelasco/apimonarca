const dbConn = require('../config/config');
const Love = function (love) {
  this.idlove = love.idlove;
  this.idlugar = love.idlugar;
  this.idusuario = love.idusuario;
};
const LoveTour = function (love) {
  this.idlove = love.idlove;
  this.idtour = love.idtour;
  this.idusuario = love.idusuario;
  this.fecharegistro = love.fecharegistro;
};
Love.totalLove = (idlugar, result) => {
  dbConn.query("SELECT COUNT(l.idlove) as totallove FROM tbllove l WHERE l.idlugar = ?", [idlugar], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
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
Love.totalLoveLugarUsuario = (idlugar, idusuario, result) => {
  dbConn.query("SELECT COUNT(l.idlove) as totallove FROM tbllove l WHERE l.idlugar = ? AND l.idusuario=?", [idlugar, idusuario], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
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
Love.totalLoveTourUsuario = (idtour, idusuario, result) => {
  dbConn.query("SELECT COUNT(l.idlovetour) as totallove FROM tbllove_tour l WHERE l.idtour = ? AND l.idusuario=?", [idtour, idusuario], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
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

Love.registrarLove = (newRegistro, result) => {
  dbConn.query("INSERT INTO tbllove  SET ?", newRegistro, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId });
    result(null, { id: res.insertId, ...newRegistro });
  });
};
Love.registrarLoveTour = (opcion,idtour,idusuario, result) => {
  dbConn.query(`CALL spAgregarLove(2,'${idtour}','${idusuario}',@success);`);
  dbConn.query(" SELECT @success;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
  });
};
Love.eliminarLove = (idlugar, idusuario, result) => {
  dbConn.query("DELETE FROM tbllove  WHERE idlugar = ? AND idusuario=?", [idlugar, idusuario], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    //   console.log("found customer: ", res[0]);
    result(null, true);
    return;

  });
};
Love.eliminarLoveTour = (idtour, idusuario, result) => {
  dbConn.query("DELETE FROM tbllove_tour  WHERE idtour = ? AND idusuario=?", [idtour, idusuario], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    //   console.log("found customer: ", res[0]);
    result(null, true);
    return;

  });
};
Love.totalLoveTour = (idtour, result) => {
  dbConn.query("SELECT COUNT(l.idlove) as totallove FROM tbllove_tour l WHERE l.idtour = ?", [idtour], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
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
module.exports = { Love, LoveTour };