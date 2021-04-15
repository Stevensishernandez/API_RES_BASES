const mysql = require('mysql');
const uuid = require('uuid');
const Router = require("express");
const app = Router();
const aws_keys = require('./users');


//MySQL base de datos
var conn = mysql.createPool(aws_keys.db_credentials);




/*******************************************************************************************************/
/*********************************************%%%%%******%%*********************************************/
/*********************************************%***%****%**%*********************************************/
/*********************************************%%%%%*******%*********************************************/
/*********************************************%***********%*********************************************/
/*********************************************%*********%%%%%*******************************************/
/*******************************************************************************************************/

//--------------------------------------------------ALMACENAMIENTO---------------------------------------
app.get("/buscarAlbum", async (req, res) => {
    console.log("BUSCAR ALBUM----------------->")
    let body = req.body;

    let user = body.user;

    let consulta = `SELECT * FROM temp1`;
    conn.query(consulta, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/CargaMasiva", async (req, res) => {
    console.log("BUSCAR ALBUM----------------->")
    let body = req.body;

    let user = body.user;

    let consulta = `LOAD DATA INFILE 'C:\Users\Steven Sis\Desktop\Carga.csv'  INTO TABLE temporal FIELDS TERMINATED BY ';'  LINES TERMINATED BY IGNORE 1 ROWS`;
    conn.query(consulta, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = app;