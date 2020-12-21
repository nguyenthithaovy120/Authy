var express=require("express");
var router=express.Router();
var fa=require('../helpers/2fa');
router.get("/",function(req,res){
    console.log("GET otp")
    var checkLogin=req.session.UserLogin1;
    if(checkLogin){
        res.render("otp",{OTP_data:{}});
    }else{
        res.redirect("login");
    }
});
router.post("/",function(req,res){
    console.log("Post otp")
    var user=req.session.UserLogin1;
    var otp=req.body.otp+"";
    const isValid = fa.verifyOTPToken(otp, user.secret)
    if(!isValid){
        res.render("otp",{OTP_data:{tb:"OTP is invalid"}});
    }else{
        req.session.UserLogin=user;
        res.redirect("/");
    }
   
});
module.exports=router;