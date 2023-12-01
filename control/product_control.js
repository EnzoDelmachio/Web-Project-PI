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

router.post("/product", async (req, res)=>{
    console.log(req.body);
    await Product.create(req.body)
    res.sendFile(path.join(__dirname, "../view/html", "product_index.html"));
})

router.get("/tableProduct", async (req, res)=>{
    const data = await Product.findAll();
    res.json(data);
});

module.exports = router;