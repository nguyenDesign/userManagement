const routes = require('express').Router({mergeParams:true})
const userController = require('../controller/userController')
const logger = require('../middleware/logging')
const auth = require("../middleware/auth")
// Prefix: /api/user
routes.route('/')
    .get(userController.index)
    .post(userController.CreateUser)

routes.route("/:id")
    .get(userController.renderUserInfo)
    .put(userController.upDateUser)
    .delete(userController.DeleteUser)

routes.route('/login')
    .get(userController.renderLoginPage)
    .post(userController.login)

routes.route('/new')
    .get(userController.renderCreateForm)

routes.route('/:id/edit')
    .get(userController.renderEditForm)


module.exports = routes