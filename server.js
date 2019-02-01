const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

var crypto = require('crypto');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wilmersabillon',
    database: 'login'
});

app.use(bodyParser.urlencoded({ extended: true })); 

con.connect( err => {
    if (err) {
        throw err;
    }
    console.log("CONNECTED!");
});

app.post('/login', (req, res) => {
    var hash = crypto.createHash('sha256').update(req.body.inputPassword).digest('hex');
    con.query("SELECT * FROM login.users WHERE nombreUsuario = ? and contrasenaUsuario = ?;", [req.body.inputUser, hash], (err, result) => {
        if(err){
            res.sendFile(path.join(__dirname+'/error.html'));
            throw err;
        }
        if(result.length > 0){
            res.sendFile(path.join(__dirname + '/success.html'));
        }else{
            res.sendFile(path.join(__dirname + '/error.html'));
        }
    });
});

app.post('/register', (req, res) => {
    var hash = crypto.createHash('sha256').update(req.body.inputPassword).digest('hex');
    con.query("SELECT * FROM login.users WHERE nombreUsuario = ?", [req.body.inputUser], (err, result) => {
        if (err) {
            throw err;
        }
        if(result.length == 0){
            con.query("INSERT INTO login.users(nombreUsuario, contrasenaUsuario) VALUES(?, ?)", [req.body.inputUser, hash], (err) => {
                if(err){
                    throw err;
                }
                res.send("¡INGRESADO AL SISTEMA!");
            });
        }else{
            res.send("¡ERROR! \nSe encontro un usuario ya registrado.");
        }
    });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});