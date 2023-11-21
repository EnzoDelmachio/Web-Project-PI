const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const db = require('./db/db_conect');
const User = require('./model/user');
const UserControl = require('./control/user_control');

app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));
app.use(UserControl);

//CONFIGURAÇÃO DO CSS
//app.use(express.static('paginas'));
const htmlPath = path.join(__dirname,'../view', 'html');
const cssPath = path.join(__dirname,'../view', 'css');
app.use('/view/html', express.static(htmlPath));
app.use('/view/css', express.static(cssPath, { 
  setHeaders: (res, path) => {
    res.setHeader('Content-Type', 'text/css');
  },
  }));

//app.use(router);

app.listen(3333, ()=>{
    console.log("Servidor rodando")
});