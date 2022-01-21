const routes = require('express').Router({mergeParams:true})
const userController = require('../controller/userController')
const logger = require('../middleware/logging')
const auth = require("../middleware/auth")
// Prefix: /api/user
routes.get('/',auth,(req,res)=>{
    userController.index(req,res)
})
routes.get('/login', (req,res)=>{
    userController.renderLoginPage(req,res)
})
routes.post('/login', async (req,res)=>{
    userController.login(req,res)
})
routes.post('/', (req,res)=>{
    userController.CreateUser(req,res)
    logger.log("info","New user has been created")
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
routes.delete('/:id/delete', (req,res)=>{
    userController.DeleteUser(req,res)

})

module.exports = routes