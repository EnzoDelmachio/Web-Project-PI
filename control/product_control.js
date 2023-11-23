const express = require("express");
const path = require("path");

const spawnSync = require('child_process');

const router = express.Router();
const Product = require("../model/product");

router.get("/product_index", (req, res)=>{
    res.sendFile(path.join(__dirname, "../view/html", "product_index.html"));
});

router.get("/product", (req, res)=>{
    res.sendFile(path.join(__dirname, "../view/html", "product.html"));
});