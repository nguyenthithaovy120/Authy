var db = require("../common/database");
var con = db.getConnection();
function  UpdateSecret(id,user_secret){
    var sql = "UPDATE users SET secret=? where id="+id;
    var value=[[user_secret]];
    con.query(sql,[value]);
}
function  addUser(name,email,password){
    var sql = "INSERT INTO users (name, email,password) VALUES ?";
        var value=[[name,email,password]];
        try {
            con.query(sql,[value]);
        } catch (error) {
            
        }
        
}
function login(email,password){
    var sql = "select * from users where email=? and password=?";
    try {
        con.query(sql,[email,pass]);
        
    } catch (error) {
        
    }
        con.query(sql,[email,pass],function(err,result){
            if (err) throw err;
            if(Object.values(result).length===0){
                console.log("rong");
                res.render("login",{data:{error:"Email hoặc mật khẩu không đúng"}});
            }
            else{
                var db_user=result[0];
                var data_session=req.session;
                data_session.UserLogin=db_user;
                res.redirect("/");
            }
        });
}
module.exports={
    UpdateSecret,
    addUser
}