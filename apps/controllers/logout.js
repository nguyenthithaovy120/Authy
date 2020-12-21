var express=require("express");
var router=express.Router();
router.get("/",function(req,res){
    console.log("Get Logout")
    try {
        req.session.destroy();
    } catch (error) {
        
    }
    
    res.redirect("/");
});
module.exports=router;