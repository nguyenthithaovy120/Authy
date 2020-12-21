var express=require("express");
var router=express.Router();

router.use("/signup",require(__dirname+"/signup"));
router.use("/login",require(__dirname+"/login"));
router.use("/profile",require(__dirname+"/profile"));
router.use("/logout",require(__dirname+"/logout"));
router.use("/otp",require(__dirname+"/otp"));
router.get("/",function(req,res){
    console.log("Get /")
    var user=req.session.UserLogin;
    if(user){
        console.log(user.name)
        res.render("home",{Home_data:{Home_name:user.name}});   
    }else{
        res.render("home",{Home_data:{}});   
    }
   
});

module.exports=router;