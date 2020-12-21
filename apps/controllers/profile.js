var express = require("express");
var router = express.Router();
var user = require('../model/user')
var fa = require('../helpers/2fa');
router.get("/", function (req, res) {
    console.log("Get Profile")
    var checkLogin = req.session.UserLogin;
    if (checkLogin) {
        var UserName = checkLogin.name;
        var UserEmail = checkLogin.email;
        var user_secret = checkLogin.secret;
        if(user_secret){
            try {
             
                const serviceName = 'WebAuthy';
                const otpAuth = fa.generateOTPToken(UserEmail, serviceName, user_secret)
                const QRCodeImage = fa.generateQRCode(otpAuth)
                QRCodeImage.then(function (result) {
                    res.render("profile", { data: { Name: UserName, Email: UserEmail, img: result } });
                });
            } catch (error) {
                return res.status(500).json(error)
            }
        }else{
            res.render("profile", { data: { Name: UserName, Email: UserEmail,img:"" } });
        }
       
    } else {
        res.redirect("/");
    }
});
router.post("/", function (req, res) {
    console.log("Post Profile")
    var User = req.session.UserLogin;
    var id = User.id;
    var UserName = User.name;
    var UserEmail = User.email;
    var user_secret = User.secret;
    console.log("key db:" + user_secret + ":");
    if (!user_secret) {
        user_secret = fa.generateUniqueSecret();
        console.log("sinh key:" + user_secret + ":");
        user.UpdateSecret(id, user_secret);
        req.session.UserLogin.secret = user_secret;
    } else {
        console.log("Xóa key:");
        user_secret="";
        user.UpdateSecret(id, user_secret);
        req.session.UserLogin.secret = user_secret;
        res.render("profile", { data: { Name: UserName, Email: UserEmail ,img:""} });
    }
    try {
      // đây là tên ứng dụng của các bạn, nó sẽ được hiển thị trên app Google Authenticator hoặc Authy sau khi bạn quét mã QR
        const serviceName = 'WebAuthy';
        const otpAuth = fa.generateOTPToken(UserEmail, serviceName, user_secret)
        // Tạo ảnh QR Code để gửi về client
        const QRCodeImage = fa.generateQRCode(otpAuth)
        QRCodeImage.then(function (result) {
            res.render("profile", { data: { Name: UserName, Email: UserEmail, img: result } });
        });
    } catch (error) {
        return res.status(500).json(error)
    }
});
module.exports = router;