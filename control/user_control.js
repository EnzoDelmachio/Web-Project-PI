const express = require("express");
const path = require("path");

const spawnSync = require('child_process');

const router = express.Router();
const conexao = require('../db/db_conect');
const User = require("../model/user");

router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "../view/html", "login.html"));
});

router.post("/", async (req, res)=>{
    var label_email = req.body.email;
    var label_password = req.body.password;

    const user = await User.findOne({
        attributes: ['id', 'name', 'email', 'password'],
        where: {
            email: label_email
        }
    })

    if(user === null){
        console.log("Usuário ou senha inválida");
        res.sendFile(path.join(__dirname, "../view/html", "signup.html"));
    }

    if(label_email == user.email && label_password == user.password){
        res.sendFile(path.join(__dirname, "../view/html", "product_index.html"));
    }else{
        console.log("Usuário ou senha inválida");
        res.sendFile(path.join(__dirname, "../view/html", "login.html"));
    }
});

router.post("/realizarLoginAPI", async(req, res)=>{
    var email = req.body.email;
    var password = req.body.password;

    console.log(email);

    const user = await User.findOne({
        attributes: ['id', 'name', 'email', 'password'],
        where: {
            email: email
        }
    })

    if(usuario === null){
        return res.status(404).json({
            mensagem: "Usuário não localizado!"
        });
    }

    if(email == user.email && password == user.password){
        return res.status(200).json({
            user
        });
    }else{
        return res.status(404).json({
            mensagem: "Usuário ou senha inválida!"
        });
    }
    
});

router.post("/cadastrarUsuarioAPI", async (req, res)=>{
    await User.create(req.body)
    .then(()=>{
       return res.json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!"
       });
    }
    ).catch(()=>{
        return res.status(400).json({
            erro: true,
            mensagem: "Falha ao cadastrar usuário!"
       });
    });
});

router.post("/cadastrarUsuario", async (req, res)=>{
    console.log(req.body);
    await User.create(req.body)
    res.sendFile(path.join(__dirname, "../view/html", "login.html"));
});

router.get("/tabelaUsuario", async (req, res)=>{
    const dados = await User.findAll();
    res.json(dados);
});

//PADRÃO SINGLETON
module.exports = router;