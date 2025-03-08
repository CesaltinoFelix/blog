const express = require("express")
const app = express()


const port = 3000;

app.get("/", (req, res) =>{
    res.send("Hello World")
})

app.listen(port, (err)=>{
    if(err)
    {
        console.log("Erro ao subir o servidor: " + err)
        return;
    }
    console.log(`Rodando o servidor na porta: ${port}`)
})