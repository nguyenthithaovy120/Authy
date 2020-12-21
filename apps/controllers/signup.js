var express=require("express");
var router=express.Router();
var user=require('../model/user')
router.get("/",function(req,res){
    res.render("signup",{Signup_data:{}});
});
router.post("/",function(req,res){
    var name=req.body.name;
    var email=req.body.email;
    var pass=req.body.password;
    var con_pass=req.body.con_password;
    if(pass!=con_pass){
        res.render("signup",{Signup_data:{tb:"pass ko giống"}});
    }else{
        user.addUser(name,email,pass);
        console.log("add thanh cong");
        res.redirect("login");
    }
});
module.exports=router;