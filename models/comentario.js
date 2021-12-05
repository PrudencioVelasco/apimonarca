const dbConn = require("../config/config");
const Comentario = function (comentario) {
  this.idcomentario = comentario.idcomentario;
  this.idlugar = comentario.idlugar;
  this.idusuario = comentario.idusuario;
  this.comentario = comentario.comentario;
  this.fecha = comentario.fecha;
};
const ComentarioLugar = function (comentario) {
  this.idcomentario = comentario.idcomentario;
  this.idlugar = comentario.idlugar; 
  this.idconquienvisito = comentario.idconquienvisito;
  this.rating = comentario.rating;
  this.comentario = comentario.comentario;
  this.fechavisito = comentario.fechavisito;
  this.eliminado = comentario.eliminado;
  this.fecharegistro = comentario.fecharegistro;
  this.idusuario = comentario.idusuario; 
};
const ComentarioTour = function (comentario) {
  this.idcomentario = comentario.idcomentario;
  this.idtour = comentario.idtour; 
  this.idconquienvisito = comentario.idconquienvisito;
  this.rating = comentario.rating;
  this.comentario = comentario.comentario;
  this.fechavisito = comentario.fechavisito;
  this.eliminado = comentario.eliminado;
  this.fecharegistro = comentario.fecharegistro;
  this.idusuario = comentario.idusuario; 
};
const ReporteComentarioLugar = function (comentario) {
  this.idreportecomentariolugar = comentario.idreportecomentariolugar;
  this.idcomentario  = comentario.idcomentario;
  this.idcausareporte = comentario.idcausareporte;
  this.comentario   = comentario.comentario;
  this.idusuario = comentario.idusuario;
  this.fecharegistro = comentario.fecharegistro;
  this.atendido  = comentario.atendido;
  this.eliminado  = comentario.eliminado; 
};
const ReporteComentarioTour = function (comentario) {
  this.idreportecomentariotour = comentario.idreportecomentariotour;
  this.idcomentario  = comentario.idcomentario;
  this.idcausareporte = comentario.idcausareporte;
  this.comentario   = comentario.comentario;
  this.idusuario = comentario.idusuario;
  this.fecharegistro = comentario.fecharegistro;
  this.atendido  = comentario.atendido;
  this.eliminado  = comentario.eliminado; 
};

Comentario.insertarComentario = (newComentario, result) => {
  dbConn.query("INSERT INTO tblcomentario SET ?", newComentario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId });
    result(null, { id: res.insertId, ...newComentario });
  });
};
Comentario.insertarComentarioLugar = (newComentario, result) => {
  dbConn.query("INSERT INTO tblcomentariolugar SET ?", newComentario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId });
    result(null, { id: res.insertId, ...newComentario });
  });
};
Comentario.insertarReporteComentarioLugar = (newReporteComentario, result) => {

  dbConn.query("INSERT INTO tblreportecomentariolugar SET ?", newReporteComentario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId });
    result(null, { id: res.insertId, ...newReporteComentario });
  });

};
Comentario.insertarReporteComentarioTour = (newReporteComentario, result) => {

  dbConn.query("INSERT INTO tblreportecomentariotour SET ?", newReporteComentario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId });
    result(null, { id: res.insertId, ...newReporteComentario });
  });

};

Comentario.obtenerComentariosPorLugar = (
  idlugar,
  idcomentario,
  limite,
  result
) => {
  let sql =
    "select " +
    "u.uid, " +
    "u.idusuario, " +
    "u.userName, " +
    "u.imageUrl, " +
    "c.idcomentario , " +
    "c.comentario , " +
    "DATE_FORMAT(c.fecha,'%d/%m/%Y') AS fecha " +
    " from " +
    " tblcomentario c " +
    " inner join tbluser u on " +
    " u.idusuario = c.idusuario " +
    "where c.idlugar  = ? ";
  if (idcomentario != "") {
    sql += " and  c.idcomentario > "+idcomentario;
  }
  sql += " ORDER BY c.fecha DESC ";
  if (limite != "") {
    sql += " LIMIT "+limite;
  }
  
  dbConn.query(sql, [idlugar], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};
Comentario.obtenerComentariosLugarv2 = (
  idlugar,
  idcomentario,
  limite,
  result
) => {
  let sql =
    "select " +
    "u.uid, " +
    "u.idusuario, " +
    "u.userName, " +
    "u.imageUrl, " +
    "c.idcomentario , " +
    "c.comentario , " +
    "c.rating , " +
    "DATE_FORMAT(c.fechavisito,'%d/%m/%Y') AS fecha " +
    " from " +
    " tblcomentariolugar c " +
    " inner join tbluser u on " +
    " u.idusuario = c.idusuario " +
    "where c.idlugar  = ? and c.eliminado = 0 ";
  if (idcomentario != "") {
    sql += " and  c.idcomentario > "+idcomentario;
  }
  sql += " ORDER BY c.fechavisito DESC ";
  if (limite != "") {
    sql += " LIMIT "+limite;
  }
  
  dbConn.query(sql, [idlugar], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};
Comentario.obtenerComentariosTour= (
  idtour,
  idcomentario,
  limite,
  result
) => {
  let sql =
    "select " +
    "u.uid, " +
    "u.idusuario, " +
    "u.userName, " +
    "u.imageUrl, " +
    "c.idcomentario , " +
    "c.comentario , " +
    "c.rating , " +
    "DATE_FORMAT(c.fechavisito,'%d/%m/%Y') AS fecha " +
    " from " +
    " tblcomentariotour c " +
    " inner join tbluser u on " +
    " u.idusuario = c.idusuario " +
    "where c.idtour  = ? and c.eliminado = 0 ";
  if (idcomentario != "") {
    sql += " and  c.idcomentario > "+idcomentario;
  }
  sql += " ORDER BY c.fechavisito DESC ";
  if (limite != "") {
    sql += " LIMIT "+limite;
  }
  
  dbConn.query(sql, [idtour], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};
Comentario.eliminarComentario = (idcomentario, result) => {
  //let email = usuario.email;
  //let password = usuario.password;
  let sql = "DELETE FROM tblcomentario WHERE idcomentario = ?";
  dbConn.query(sql, [idcomentario], (err, res) => {
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
Comentario.eliminarComentariov2 = (idcomentario, result) => {
  //let email = usuario.email;
  //let password = usuario.password;
  let sql = "UPDATE tblcomentariolugar SET eliminado = 1 WHERE idcomentario = ?";
  dbConn.query(sql, [idcomentario], (err, res) => {
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
Comentario.totalComentarioLugar = (idlugar, result) => {
  dbConn.query(
    "SELECT COUNT(c.idcomentario) as totalcomentario FROM tblcomentariolugar c WHERE c.eliminado = 0 AND c.idlugar = ? ",
    [idlugar],
    (err, res) => {
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
    }
  );
};
Comentario.totalComentarioLugarUsuario = (idlugar,idusuario, result) => {
  dbConn.query(
    "SELECT COUNT(c.idcomentario) as totalcomentario FROM tblcomentariolugar c WHERE c.eliminado = 0 AND c.idlugar = ? AND c.idusuario = ? ",
    [idlugar,idusuario],
    (err, res) => {
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
    }
  );
};
module.exports = {
  Comentario,
  ComentarioLugar,
  ReporteComentarioLugar,
  ComentarioTour
};
