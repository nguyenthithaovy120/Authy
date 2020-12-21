var mysql=require("mysql");
var connection=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"webauthy"
});
connection.connect();
console.log("ket noi thanh cong");
function getConnection(){
    if(!connection){
        connection.connect();
    }
    return connection;
}
module.exports={
    getConnection:getConnection
}