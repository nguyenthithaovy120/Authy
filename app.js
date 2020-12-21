var express=require("express");
var bodeParser=require("body-parser");
var app=express();
var session = require('express-session')
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'somesecret', 
    cookie: { maxAge: 600000 }}));
//body parser
app.use(bodeParser.json());
app.use(bodeParser.urlencoded({extended:true}));
//views
app.set("views",__dirname+"/apps/views");
app.set("view engine","ejs");
app.use("/static",express.static(__dirname+"/apps/public"));
var controllers=require(__dirname+"/apps/controllers");
app.use(controllers);

app.listen(3000,"localhost",function(){
    console.log("server is running on port 3000");
});