const routes = require('express').Router({mergeParams:true})
const User = require('../model/userModel')
const userController = require('../controller/userController')

// Prefix: /api/user
routes.get('/',  (req,res)=>{
    userController.index(req,res)
})
routes.post('/', (req,res)=>{
    userController.CreateUser(req,res)
})
routes.get('/new', (req,res)=>{
    userController.renderCreateForm(req,res)
})
routes.get('/:id', (req,res)=>{
    userController.renderUserInfo(req,res)
})
routes.get("/:id/edit", (req,res)=>{
    userController.renderEditForm(req,res)
})
routes.put('/:id',  (req,res)=>{
    userController.upDateUser(req,res)
})


module.exports = routes