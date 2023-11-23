const express = require("express");
const path = require("path");

const spawnSync = require('child_process');

const router = express.Router();
const Moviment = require("../model/moviment");

router.get("/moviment_index", (req, res)=>{
    res.sendFile(path.join(__dirname, "../view/html", "moviment_index.html"));
});

router.get("/moviment", (req, res)=>{
    res.sendFile(path.join(__dirname, "../view/html", "moviment.html"));
});