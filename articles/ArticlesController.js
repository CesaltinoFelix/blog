const express = require("express")
const router = express.Router()
const Category = require('./../categories/Category')

router.get("/articles", (req, res)=>{
    res.send("Rota dos artigos")
})

router.get("/admin/articles/new", async(req, res)=>{
    const categories = await Category.findAll()
    res.render("admin/articles/new", {categories})
})

module.exports = router