const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const UserControl = require('./control/user_control');

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(UserControl);

app.use(express.static(__dirname + '/view'));

//app.use(router);

app.listen(3333, ()=>{
    console.log("Servidor rodando")
});