const User = require('../model/userModel')
const wrapAsync = require('../middleware/wrapAsync')
module.exports.CreateUser = wrapAsync(async function(req,res){
    let user = new User(req.body.user)
    await user.save()
    res.redirect('/api/user')
})

module.exports.upDateUser = wrapAsync(async function(req,res){
    await User.findByIdAndUpdate(req.params.id,{...req.body.user})
    res.redirect(`/api/user/${req.params.id}`)
})

module.exports.DeleteUser = wrapAsync(async function(req,res){
    await User.findByIdAndDelete(req.params.id)
    res.render('/api/user')
})

module.exports.index = wrapAsync(async function(req,res){
    let users = await User.find()
    res.render('index', {users})
})

module.exports.renderCreateForm = function(req,res){
    res.render('new')
}

module.exports.renderUserInfo = wrapAsync( async function(req,res){
        let user = await User.findById(req.params.id)
        res.render('show',{user})
    }
)
module.exports.renderEditForm = wrapAsync(async function(req,res){
    let user = await User.findById(req.params.id)
    res.render('edit', {user})
})