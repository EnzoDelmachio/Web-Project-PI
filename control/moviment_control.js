const express = require("express");
const path = require("path");

const spawnSync = require('child_process');

const router = express.Router();
const Moviment = require("../model/moviment");
const Product = require("../model/product")

router.get("/moviment_index", (req, res)=>{
    res.sendFile(path.join(__dirname, "../view/html", "moviment_index.html"));
});

router.get("/moviment", (req, res)=>{
    res.sendFile(path.join(__dirname, "../view/html", "moviment.html"));
});

router.post("/moviment", async (req, res)=>{
    var label_name = req.body.name;

    const product = await Product.findOne({
        attributes: ['id', 'name', 'quantity', 'value'],
        where: {
            name: label_name
        }
    })

    if(product == null){
        console.log("Produto inválido")
    }else{
        console.log(req.body);
        await Moviment.create(req.body);
        var label_type = req.body.type;
        var label_quantity = req.body.quantity;
        if(label_type == "1"){
            product.quantity = product.quantity + label_quantity;
            await product.save();
        }else{
            product.quantity = product.quantity - label_quantity;
            await product.save();
        }
        res.sendFile(path.join(__dirname, "../view/html", "moviment_index.html"))
    }
})

router.get("/tableMoviment", async (req, res)=>{
    const data = await Moviment.findAll();
    res.json(data);
});

module.exports = router;