const dbConn = require('../config/config');
const ConQuienVisito = function (conquienvisito) {
    this.idconquienvisito = conquienvisito.idconquienvisito;
    this.nombre = conquienvisito.nombre; 
    this.activo = conquienvisito.activo; 
};
ConQuienVisito.todosConQuienVisito = result => {
    dbConn.query("SELECT * FROM tblconquien_visito WHERE activo = 1 ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } 
        console.log("customers: ", res);
        result(null, res);
    });
}; 
module.exports = ConQuienVisito;