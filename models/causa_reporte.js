const dbConn = require('../config/config');
const CausaReporte = function (causareporte) {
    this.idcausareporte = causareporte.idcausareporte;
    this.nombrecausareporte = causareporte.nombrecausareporte;
    this.activo  = activicausareportedad.activo ; 
};
CausaReporte.todasCausasReportes = result => {
    dbConn.query("SELECT * FROM tblcausa_reporte WHERE activo = 1 ", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } 
        console.log("customers: ", res);
        result(null, res);
    });
};

module.exports = CausaReporte;