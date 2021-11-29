const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config()
const user = require('./routers/usersRouters');
const lugar = require('./routers/lugarRouters');
const categoria = require('./routers/categoriaRouters');
const ruta = require('./routers/rutaRouters');
const actividad = require('./routers/actividadRouters');
const sitiosinteres = require('./routers/sitiosinteresRouters');
const atractivo = require('./routers/atractivoRouters');
const comentario = require('./routers/comentarioRouters');
const love = require('./routers/loveRouters');
const facebook = require('./routers/facebookRouters');
const conquienvisito = require('./routers/conQuienVisitoRouters');
const causareporte = require('./routers/causaReporteRouters');
const compania = require('./routers/companiaRouters');
const tour = require('./routers/tourRouters');
const telefono = require('./routers/telefonoRouter');

app.use(express.static(__dirname + '/assets/lugares'));

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(cors());
app.disable('x-powered-by'); 
app.set('port',port);
server.listen(port,process.env.CONF_HOST,function(){
console.log('La aplicacion esta corriendo en: '+process.env.CONF_HOST+':'+port);
});

/*
*LLAMANDO A LA RUTA
*/
user(app);
lugar(app);
categoria(app);
ruta(app);
actividad(app);
sitiosinteres(app);
atractivo(app);
comentario(app);
love(app);
facebook(app);
conquienvisito(app);
causareporte(app);
compania(app);
tour(app);
telefono(app);


module.exports ={
 app:app,
 server:server  
}