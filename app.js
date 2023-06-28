//jshint esversion:6
require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const shortId=require("shortid");
const mongoose=require("mongoose");
const session = require('express-session')
const passport =require("passport")
const passportLocalMongoose = require("passport-local-mongoose")


const app = express();


app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
    secret:"Our little secret.",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/userUrlDB',{useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.set("useCreateIndex",true);

const userSchema =new mongoose.Schema({
    email:String,
    password:String
})

const shortUrlSchema = new mongoose.Schema({
    username:{
        type:String
    },
    full:{
     type:String,
     required:true
 
    },
    short:{
     type:String,
     required:true,
     default: shortId.generate
    },
    clicks:{
     type:Number,
     required:true,
     default:0
    },
    Note:{
     type:String,
     required:true,
     default:"Your short url"
    }
 
     })
     const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema)

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema)

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
    res.render("home")
})
app.get("/login",function(req,res){
    res.render("login")
})
app.get("/register",function(req,res){
    res.render("register")
})
app.get("/secrets",async (req,res) => {
    if(req.isAuthenticated()){
        const shortUrls = await ShortUrl.find({
        username:req.user.username
        }).then({function(){}})
        
        res.render('secrets',{shortUrls: shortUrls, username:req.user.username}) 
       
    }
        
    else{res.redirect("/login")}
})

app.get("/logout", (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/");
    });
  });


app.post("/register",function(req,res){
   User.register({username:req.body.username}, req.body.password, function(err,user){
    if(err){
        console.log(err)
        res.redirect("/register")
    }
    else{
        passport.authenticate("local")(req,res,function(){
            res.redirect("/secrets")
        })
    }
   })







   

})

app.post("/login", function(req,res){
const user = new User({
    username:req.body.username,
    password: req.body.password
})
req.login(user, function(err){
    if(err){
        console.log(err)}
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets")
            }) 
        }
})



})
app.post("/urlsubmission", async(req,res) => {
    await ShortUrl.create({full:req.body.fullUrl,Note:req.body.Note,username:req.user.username})
    
    res.redirect("/secrets")
  
  })
  
  app.get("/:shortUrl", async(req,res) =>{
      const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl})
      if(shortUrl===null)return res.sendStatus(404)
      shortUrl.click++;
      shortUrl.save()
  
      res.redirect(shortUrl.full)
  })
  app.post("/search",async (req,res) =>{
    if(req.isAuthenticated()){
        const shortUrls = await ShortUrl.find({
        username:req.user.username
        }).then({function(){}})
        const requiredUrls=shortUrls.filter(
            (url)=>{return url.Note.includes(req.body.query)}
        )
        
        res.render('secrets',{shortUrls: requiredUrls, username:req.user.username}) 
       
    }
        
    else{res.redirect("/login")}
  })








app.listen(3000,function(){
    console.log("server started on port 3000")
})