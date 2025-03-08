const express = require("express")
const router = express.Router()


router.get("/articles", (req, res)=>{
    res.send("Rota dos artigos")
})

router.get("/admin/articles/new", (req, res)=>{
    res.send("Rota admin novo artigo")
})

module.exports = router