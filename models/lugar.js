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
Lugar.obtenerLugares = (page_send, result) => {
  const limit =20;
  const page = page_send;
  const offset = (page-1)* limit;
  const query = "select * from tbllugar limit "+limit+" offset "+offset;
 dbConn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
  /*var numRows;
  var queryPagination;
  var numPerPage = parseInt(npp, 10) || 1;
  var page = parseInt(page, 10) || 0;
  var numPages;
  var skip = page * numPerPage;
  var limit = skip + ',' + numPerPage;
  queryAsync("SELECT count(*) as numRows FROM tbllugar").then(
    function (result) {
      numRows = result[0].numRows;
      numPages = Math.ceil(numRows / numPages);
    }
  ).then(
    () => queryAsync('SELECT * FROM tbllugar ORDER BY ID DESC LIMIT' + limit)
  ).then(
    function (results) {
      var responsePayload = {
        results: results
      };
      if (page < numPages) {
        responsePayload.pagination = {
          current: page,
          perPage: numPerPage,
          previous: page > 0 ? page - 1 : undefined,
          next: page < numPages - 1 ? page + 1 : undefined
        }
      }else responsePayload.pagination={
err:'required page '+page+' is >= to maximun page number '+ numPages
      }
      result(null, responsePayload);
    }
  ).catch(function(err){
    
  })*/
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
  let sql = `select * from vwtodoslugaresactivo where concat(LOWER(nombre),LOWER(direccion),LOWER(nombreclasificacion),LOWER(actividades)) like LOWER('%${valor}%') `;
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
Lugar.obtenerTodosLugares = (result) => {
  let sql = "select * from vwtodoslugaresactivo";
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
Lugar.obtenerTodosLugaresCercano = (latitud,longitud,result) => {
  let sql = `select l.*, 111.111 *
  DEGREES(ACOS(LEAST(1.0, COS(RADIANS(l.latitud))
       * COS(RADIANS(${latitud}))
       * COS(RADIANS(l.longitud - ${longitud}))
       + SIN(RADIANS(l.latitud))
       * SIN(RADIANS(${latitud}))))) AS distancia from vwtodoslugaresactivo l WHERE  l.latitud != 0 AND l.longitud != 0  HAVING distancia < 100.0   
       ORDER BY distancia ASC`;
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

Lugar.buscarLugaresActivosIn = (valor,result) => {
  let sql = `select * from vwtodoslugaresactivo where idlugar IN (${valor}) `;
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

module.exports = Lugar;