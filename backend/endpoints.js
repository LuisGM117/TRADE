const express = require("express");
const app = express();
const mysql = require("mysql");

app.use(express.json());

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"databasename"
});
connection.connect((err)=>{
    if(err) throw err;
    console.log("Connected to database");
});



//set new user
app.post("/insert",(req,res)=>{
    const user = {
        name: req.body.name,
        description: req.body.description,
        password: req.body.password,
        mail: req.body.mail,
        recursos: req.body.recursos,
        coordenadas: req.body.coordenadas
    };
    insertar(connection,user ,result =>{
        res.json(result);
    })
});


//update un parametro especifico
app.post("/update/:userId",(req,res)=>{
    let id = req.params.userId;
    getUser(connection,parseInt(id),result =>{
        let user ={
            Id: id,
            name:null,
            description:null,
            password:null,
            mail:null,
            recursos:null,
            coordenadas:null
        };
        
        if (req.body.name != null){
            user.name = req.body.name;
        }else{
            user.name = result[0].User;
        }
        if (req.body.description != null){
            user.description = req.body.description;
        }else{
            user.name = result[0].Description;
        }
        if (req.body.password != null){
            user.password = req.body.password;
        }else{
            user.password = result[0].Password;
        }
        if (req.body.mail != null){
            user.mail = req.body.mail;
        }else{
            user.mail = result[0].Mail;
        }
        if (req.body.recursos != null){
            user.recursos = req.body.recursos;
        }else{
            user.recursos = result[0].Recursos;
        }
        if (req.body.coordenadas != null){
            user.coordenadas = req.body.coordenadas;
        }else{
            user.coordenadas = result[0].Coordenadas;
        }
        updateUser(connection,user, result =>{
            res.json(result);
        });
    })
    
});

//Get user
app.get("/get/:userId",(req,res)=>{
    let id = req.params.userId;
    getUser(connection,parseInt(id),result =>{
        res.json(result);
    })
});
//get all users
app.get("/get/all",(req,res)=>{
    getUsers(connection,result =>{
        res.json(result);
    });
});
//borrar usuario
app.delete("/delete/:userId",(req,res)=>{
    let id = req.params.userId;
    deleteUser(connection,parseInt(id),result =>{
        res.json(result);
    })
});


app.get("/",(req,res)=>{
    
});

app.listen(8000,()=>{
console.log("Servidor en puerto 3000");
});


function insertar(connection,user,callback){
    getIdActual(connection, result =>{
        let insertQuery = "INSERT INTO Users(Id,User,Description,Password,Mail,Recursos,Coordenadas) "+
        "VALUES("+(result.length+1)+","+"'"+user.name+"'"+","+"'"+user.description+"'"+","+"'"+user.password+"'"+","+"'"+user.mail+"'"+","+"'"+user.recursos+"'"+","+"'"+user.coordenadas+"'"+");";
        connection.query(insertQuery,function(err,result){
            if(err) throw err;
            callback(result);
        });
    });

}
function getIdActual(connection,callback){
    const insertQuery = "SELECT * FROM Users;";
    connection.query(insertQuery,function(err,result){
        if(err) throw err;
        callback(result);
    });
    
}

function getUser(connection,Id,callback){
    const insertQuery = "SELECT * FROM Users WHERE Id = "+Id+";";
    connection.query(insertQuery,function(err,result){
        if(err) throw err;
        callback(result);
    }); 
}

function getUsers(connection,callback){
    const insertQuery = "SELECT User,Description, Password,Mail ,Recursos,Coordenadas FROM Users";
    connection.query(insertQuery,function(err,result){
        if(err) throw err;
        callback(result);
    }); 
}

function updateUser(connection,user,callback){
    const insertQuery = "UPDATE Users SET "+
    "User = "  + "'"+user.name + "'"+ ", "+
    "Description = "+ "'"+user.description + "'"+ ", "+
    "Password = "+ "'"+user.password + "'"+ ", "+
    "Mail = "+ "'"+user.mail + "'"+ ", "+
    "Recursos = "+ "'"+user.recursos + "'"+ ", "+
    "Coordenadas = "+ "'"+user.coordenadas+ "'" +
    " WHERE Id = "+ user.Id+";";
    connection.query(insertQuery,function(err,result){
        if(err) throw err;
        callback(result);
    }); 
}

function deleteUser(connection,Id,callback){
    const insertQuery = "DELETE FROM Users WHERE Id = "+Id+";";
    connection.query(insertQuery,function(err,result){
        if(err) throw err;
        callback(result);
    }); 
}