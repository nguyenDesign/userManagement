const User = require('../model/userModel')

module.exports.CreateUser = async function(req,res){
    let user = new User(req.body.user)
    await user.save()
    res.redirect('/api/user')
}

module.exports.upDateUser = async function(req,res){
    await User.findByIdAndUpdate(req.params.id,{...req.body.user})
    res.redirect(`/api/user/${req.params.id}`)
}

module.exports.DeleteUser = async function(req,res){
    await User.findByIdAndDelete(req.params.id)
    res.render('/api/user')
}

module.exports.index = async function(req,res){
    let users = await User.find()
    res.render('index', {users})
}

module.exports.renderCreateForm = function(req,res){
    res.render('new')
}

module.exports.renderUserInfo = async function(req,res){
    let user = await User.findById(req.params.id)
    res.render('show',{user})
}

module.exports.renderEditForm = async function(req,res){
    let user = await User.findById(req.params.id)
    res.render('edit', {user})
}