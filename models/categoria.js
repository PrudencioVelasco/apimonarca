const dbConn = require('../config/config');
const Categoria = function (categoria) {
    this.idcategoria = categoria.idcategoria;
    this.nombrecategoria = categoria.nombrecategoria;
    this.create_at = categoria.create_at;
    this.update_at = categoria.update_at;
};
Categoria.todasCategorias = result => {
    dbConn.query("SELECT * FROM tblclasificacion WHERE mostrar = 1 ORDER BY nombreclasificacion ASC ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } 
        console.log("customers: ", res);
        result(null, res);
    });
};
Categoria.categoriasPorLugar = (idlugar, result) => {
    //let email = usuario.email;
    //let password = usuario.password;
    let sql = "select tbl.idlugarprincipal, tbl.idlugarsecundario , tbl.idclasificacion , tbl.nombreclasificacion from (select ll.idlugarprincipal, ll.idlugarsecundario , c.idclasificacion , c.nombreclasificacion from tbllugar l "+
        "inner join tbllugardentrolugar ll on l.idlugar = ll.idlugarprincipal "+
        "inner join tbllugar l2 on ll.idlugarsecundario = l2.idlugar "+
        "inner join tblclasificacion c on c.idclasificacion = l2.idclasificacion where ll.idlugarprincipal = ? "+
        "and c.idclasificacion not in (1,3,4,9) "+
        "group by c.idclasificacion "+
        "union  all "+
        "select   280490 as idlugarprincipal,280490 as idlugarsecundario , 280490 as idclasificacion , 'ubication' nombreclasificacion " +
        "union  all "+
        "select   280491 as idlugarprincipal,280490 as idlugarsecundario , 280490 as idclasificacion , 'restaurant' nombreclasificacion " +
        "union  all "+
        "select   280492 as idlugarprincipal,280490 as idlugarsecundario , 280490 as idclasificacion , 'hotel' nombreclasificacion) tbl";
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

module.exports = Categoria;