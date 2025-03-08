const express = require("express")
const router = express.Router()
const Category = require('./../categories/Category')
const Article = require("./Article")
const slugify = require("slugify")

router.get("/admin/articles", async(req, res)=>{
    const articles = await Article.findAll({
        include:[{model: Category}]
    })
    res.render("admin/articles/index", {articles})
})

router.get("/admin/articles/new", async(req, res)=>{
    const categories = await Category.findAll()
    res.render("admin/articles/new", {categories})
})

router.post("/articles/save", (req, res)=>{
    const {title, body, categoryId} = req.body
    if((title != undefined) && (categoryId != undefined))
    {
        if(isNaN(categoryId))
            res.redirect('/admin/articles')

        Article.create({
            title,
            body,
            slug: slugify(title),
            CategoryId: categoryId
        }).then(()=>{
            res.redirect('/admin/articles/new')
        }).catch(()=>{
            res.redirect('/admin/articles')
        })
    }else
    res.redirect('/admin/articles')
})


router.post("/articles/delete", (req, res)=>{
    const id = req.body.id
    if(id != undefined)
    {
        if(!isNaN(id))
        {
            Article.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect('/admin/articles')
            })
        }else
            res.redirect('/admin/articles')

    }else
    res.redirect('/admin/articles')
})

router.get("/admin/articles/edit/:id", async(req, res)=>{
    const id = req.params.id
    if(isNaN(id))
        res.redirect('/admin/articles')
    Article.findByPk(id).then((article)=>{
        if(article != undefined)
        {
            Category.findAll().then((categories)=>{
                res.render("admin/articles/edit", {article, categories})
            })
        }
        else
        res.redirect('/admin/articles')
    }).catch((err)=>{
        res.redirect('/admin/articles')
    })

})

module.exports = router