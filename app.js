const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { redirect } = require("express/lib/response");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let nombre = "Hola Luis, bienvenido a EJS";
var mes = "";
let messagesArray = [];



app.get("/", function(req, res){
    res.render("signup");
});

app.post("/signup", function(req, res){
   // console.log(req.body.signupButton);
    console.log(req.body);
    res.redirect("/home");

});

app.get("/login", function(req, res){
    res.render("login");
});



app.get("/home", function(req, res){
    res.render("home", {variable: nombre});
});


app.post("/home", function(req, res){
    console.log(req.body.postButton);
});


app.get("/profile", function(req, res){
    res.render("profile");
});

app.post("/profile", function(req, res){
    res.redirect("/home");
});

app.get("/messages", function(req, res){
    let today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let day = "";

    if (minute < 10) {
        day = hour + ":0" + minute;
    } else {
        day = hour + ":" + minute;
    }

    




    res.render("messages", {posts: messagesArray, hour: day} );
    
});

app.post("/messages", function(req, res){
     console.log(req.body.postMessage);
     mes = req.body.postMessage;
     messagesArray.push(mes);

     res.redirect("/messages");
});










app.listen(3000, function(){
    console.log("Server started on port 3000");
});
