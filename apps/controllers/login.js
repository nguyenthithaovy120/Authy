var express = require("express");
var router = express.Router();
var db = require("../common/database");
var con = db.getConnection();
router.get("/", function (req, res) {
    var checkLogin = req.session.UserLogin;
    if (!checkLogin) {
        res.render("login", { data: {} });
    } else {
        res.redirect("/");
    }

});
router.post("/", function (req, res) {
    var email = req.body.email;
    var pass = req.body.password;
    console.log("EMAIL:" + email)
    console.log("PASS:" + pass)
    if (email == "" || pass == "") {
        res.render("login", { data: { error: "Email hoặc mật khẩu không đúng" } });
    } else {
        var sql = "select * from users where email=? and password=?";
        con.query(sql, [email, pass], function (err, result) {
            if (err) throw err;
            if (Object.values(result).length === 0) {
                console.log("rong");
                res.render("login", { data: { error: "Email hoặc mật khẩu không đúng" } });
            }
            else {
                var db_user = result[0];
                var data_session = req.session;
                if (db_user.secret) {
                    data_session.UserLogin1 = db_user;
                    res.redirect("otp");
                } else {
                    data_session.UserLogin = db_user;
                    res.redirect("/");
                }
            }
        });
    }
});
module.exports = router;