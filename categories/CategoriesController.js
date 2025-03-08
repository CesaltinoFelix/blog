const express = require("express")
const router = express.Router()
const Category = require('./Category')
const slugify = require("slugify")

router.get("/admin/categories", async (req, res)=>{
    const categories = await Category.findAll();
    res.render("admin/categories/index", {categories})
})

router.post("/categories/save", (req, res)=>{
    const title = req.body.title
    if(title != undefined)
    {
        Category.create({
            title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect('/admin/categories')
        })
    }else
    res.redirect('admin/categories/new')
})

router.post("/categories/update", (req, res)=>{
    const id = req.body.id
    const title = req.body.title
    if(isNaN(id))
        res.redirect('/admin/categories')
    if((title != undefined) && (id != undefined))
    {
        Category.update({
            title,
            slug: slugify(title)
        }, 
        {
            where: {
                id: id
            }
        }
    ).then(()=>{
            res.redirect('/admin/categories')
        })
    }else
    res.redirect('admin/categories')
})

router.post("/categories/delete", (req, res)=>{
    const id = req.body.id
    if(id != undefined)
    {
        if(!isNaN(id))
        {
            Category.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect('/admin/categories')
            })
        }else
            res.redirect('/admin/categories')

    }else
    res.redirect('/admin/categories')
})

router.get("/admin/categories/edit/:id", (req, res)=>{
    const id = req.params.id
    if(isNaN(id))
        res.redirect('/admin/categories')
    Category.findByPk(id).then((category)=>{
        console.log(category)
        if(category != undefined)
        {
            res.render("admin/categories/edit", {category})
        }else
        res.redirect('/admin/categories')
    }).catch((err)=>{
        res.redirect('/admin/categories')
    })

})

router.get("/admin/categories/new", (req, res)=>{
    res.render('admin/categories/new')
})
module.exports = router