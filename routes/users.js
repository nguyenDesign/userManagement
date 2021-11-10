const routes = require('express').Router({mergeParams:true})
const User = require('../model/userModel')
const userController = require('../controller/userController')

// Prefix: /api/user
routes.get('/', async (req,res)=>{
    userController.index(req,res)
})
routes.post('/', async(req,res)=>{
    let user = new User(req.body.user)
    await user.save()
    res.redirect('/api/user')
})
routes.get('/new', async(req,res)=>{
    res.render('new')
})
routes.get('/:id', async(req,res)=>{
    let user = await User.findById(req.params.id)
    res.render('show',{user})
})
routes.get("/:id/edit", async(req,res)=>{
    let user = await User.findById(req.params.id)
    res.render('edit', {user})
})
routes.put('/:id', async (req,res)=>{
    await User.findByIdAndUpdate(req.params.id, {...req.body.user})
    res.redirect(`/api/user/${req.params.id}`)
})


module.exports = routes