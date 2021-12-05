const promise = require('bluebird'); 
var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'dbmonarca',
    user     : 'root',
    password : '28duguer',
    multipleStatements:true,
});
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });


  
/*const options ={
    promiseLib:promise,
    query:(e)=>{}
};
const pgp =require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114,function(stringValue){
    return stringValue;

});

const databaseConfig ={ 
        'host': '127.0.0.2', 
        'port': 5432,
        'database': 'delivery_db',
        'user': 'postgres',
        'password': '28duguer',  
};
const db = pgp(databaseConfig);*/

module.exports = connection;