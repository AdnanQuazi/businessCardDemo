require('dotenv').config();
const express = require('express');
const app = express();
const path = require("path");
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const auth = require("./middleware/auth");
require("./db/conn");

const UserData = require('./models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set("view engine" , "hbs");
app.set("views", templatePath);
app.use(express.static(staticPath));
app.use(cookieParser());
hbs.registerPartials(partialPath);



app.get("/", auth , (req,res)=>{

   try{
    res.render("index", {
        token : req.token,
        userName : req.user.username
    })
    }catch(error){

        res.render("index")
    }
    
   
    
})
app.post("/",(req,res)=>{
   
})
app.get("/products", (req,res)=>{

    res.render("index");
    res.end;
})
app.get("/register", auth ,(req,res)=>{
    
    try{
        res.render("signup", {
            token : req.token,
            userName : req.user.firstname
        })
        }catch(error){
    
            res.render("signup")
        }
        
})
app.post("/register", async (req,res)=>{
    try {
        const pass = req.body.password;
        const conpass = req.body.conpassword;

        if(pass == conpass){
            const register = new UserData({

                firstname : req.body.Firstname,
                lastname : req.body.Lastname,
                email : req.body.email,
                phone : req.body.phone,
                gender : req.body.gender,
                password : req.body.password

            })
            const emailSearch = await UserData.findOne({email : req.body.email})
            const phoneSearch = await UserData.findOne({phone : req.body.phone})
            if(emailSearch){
                res.render("signup",{
                    error : "exist"
                });
                
            }else if(phoneSearch){
                res.render("signup",{
                    error : "exist"
                });
                
            }else{
                const token  = await register.generateToken();
            
            
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30*24*60*60*1000),
                httpOnly: true
            });
            
            const username = await register.generateUsername();
            await register.save();
            res.redirect("/login")
        }
    
        }else{
            res.status(401).send("password not matching")
        }
        

    } catch (error) {
        
        res.status(401).send(error);
    }
})
app.get("/login", auth,(req,res)=>{
    try{
        res.render("login", {
            token : req.token,
            userName : req.user.firstname
        })
        }catch(error){
            
            res.render("login")
        }
        
})
app.post("/login", async (req,res)=>{

    try {
        const email = req.body.email
        const pass = req.body.password
        
        const user = await UserData.findOne({email});
        
        const passMatch = await bcrypt.compare(pass, user.password);
        const token  = await user.generateToken();
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30*24*60*60*1000),
                httpOnly: true
            });
        if(passMatch){

            res.redirect("/");

        }else{

            res.send("inavlid details")

        };
        } catch (error) {

            res.status(401).send(error);

        }
    


})
app.get("/myprofile", auth , (req,res)=>{
   res.render("profile");
})

app.get("/profile", auth , async (req,res)=>{

        try {
            if(req.token){

            const searchedUser = await UserData.findOne({username : req.query.id});
            console.log(searchedUser);
            res.send(searchedUser);
            }else{
                res.send("login first")
            }
        } catch (error) {
            res.status(401).send(error);
        }
})
app.get("/logout" , auth , async (req,res)=>{
    try {

        req.user.tokens = req.user.tokens.filter((currenttoken) =>{
            return currenttoken.token != req.token
        })
        res.clearCookie("jwt");
        
        await req.user.save();
        res.redirect("/login");
    } catch (error) {
        res.status(401).send(error)
    }
 })
app.listen(port, ()=>{
    console.log(`connection is established at ${port}`);
});