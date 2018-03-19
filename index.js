const http = require('http');
const express = require('express');

const servidor = http.createServer(
    (req,res) => {
        res.setHeader("Content-type", "application/json")
        res.write(sendNumberRandom().toString());
        res.end();
    }
)

servidor.listen(5000,()=>{
    console.log("servidor listo");
})

function sendNumberRandom(){
    return Math.round(Math.random() * 1000 + 0);
}
console.log("hola")