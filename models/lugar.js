const dbConn = require('../config/config');
const Lugar = function (lugar) {
  this.idlugar = lugar.idlugar;
  this.nombre = lugar.nombre;
  this.direccion = lugar.direccion;
  this.latitud = lugar.latitud;
  this.longitud = lugar.longitud;
  this.descripcion = lugar.descripcion;
  this.historia = lugar.historia;
  this.resena = lugar.resena;
  this.love = lugar.love;
  this.idclaficiacion = lugar.idclaficiacion;
  this.nombreclasificacion = lugar.nombreclasificacion;
  this.actividades = lugar.actividades;
  this.imagenes = lugar.imagenes;
  this.principal = lugar.principal;
  this.create_at = lugar.create_at;
  this.update_at = lugar.update_at;
};
Lugar.todoLosLugaresActivos = result => {
  dbConn.query("SELECT * FROM vwTodoslugaresActivo", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};
Lugar.obtenerImagenesLugar = (idlugar,result)=>{
  let sql = "SELECT * FROM tblimagen WHERE idlugar = ?";
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
Lugar.obtenerLugaresDentroLugar = (idlugar,result)=>{
  let sql = "SELECT * FROM vwlugaresdentrolugar WHERE idlugarprincipal = ?";
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
Lugar.buscarLugaresActivos = (valor,result) => {
  let sql = `select * from vwtodoslugaresactivo where concat(nombre,direccion,nombreclasificacion) like '%${valor}%' `;
  dbConn.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};
Lugar.obtenerLugaresPorCategoria = (valor,result) => {
  let sql = "select * from vwtodoslugaresactivo where idclasificacion =?  ";
  dbConn.query(sql,[valor], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};
Lugar.sliderPrincipal = result => {
  dbConn.query("SELECT * FROM vwslider  WHERE idtiposlider = 1 ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};
Lugar.sliderLugaresTops = result => {
  dbConn.query("SELECT * FROM vwslider  WHERE idtiposlider = 2 ", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};
Lugar.clasificacionPorLugarIdRuta = (idruta, result) => {
  let sql = "select tbl.idclasificacion, tbl.nombreclasificacion from (	" +
    "select c.idclasificacion, c.nombreclasificacion from tblruta r " +
    "inner join tblrutalugar rl on r.idruta = rl.idruta " +
    "inner join tbllugar l on l.idlugar = rl.idruta " +
    "inner join tblclasificacion c on c.idclasificacion = l.idclasificacion  where r.idruta = ? " +
    "group by c.idclasificacion  w " +
    "union all " +
    "select 280490 as idclaficacion, 'UBICACION' as nombreclasificacion) tbl ";
  dbConn.query(sql, [idruta], (err, res) => {
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
Lugar.clasificacionPorIdLugar = (idlugarprincipal, result) => {
  let sql = "select tbl.idclasificacion, tbl.nombreclasificacion from (	" +
    "select c.idclasificacion, c.nombreclasificacion from tblclasificacion c inner join tbllugar l on c.idclasificacion = l.idlugar " +
    "inner join  tbllugardentrolugar ldl on l.idlugar = ldl.idlugarsecundario where dld.idlugarprincipal  = ? " +
    "union all " +
    "select 280490 as idclaficacion, 'UBICACION' as nombreclasificacion " +
    ") tbl ";
  dbConn.query(sql, [idlugarprincipal], (err, res) => {
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
Lugar.detalleLugar = (idlugar, result) => {
  //let email = usuario.email;
  //let password = usuario.password;
  let sql = "SELECT * FROM vwTodoslugaresActivo WHERE idlugar = ?";
  dbConn.query(sql, [idlugar], (err, res) => {
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
Lugar.obtenerDetalleLugar = (idlugar,result)=>{
  let sql = "SELECT * FROM vwtodoslugaresactivo WHERE idlugar = ?";
  dbConn.query(sql, [idlugar], (err, res) => {
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

module.exports = Lugar;