const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        unique: true
    },
    password: String,
    address: String,
    upvote: {
        type:String,
        default: 0
    },
    downvote: {
        type: String,
        default: 0
    },
    level: {
        type: String,
        default: 0
    },
    role: {
        type: String,
        enum: ['admin', 'member', 'moderator']
    },
    tokens : [{
        token:{
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save',async function(next){
    let user = this
    if (user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.statics.findByCredentials = async function(userName,password){
    let user = await userModel.findOne({name:userName})
    if (!user){
        throw new Error()
    }
    let isRight = bcrypt.compare(password, user.password)
    if (!isRight){
        throw new Error()
    }
    return user
}

userSchema.methods.generateAuthToken = async function(){
    let user = this
    let token = JWT.sign({id: user._id.toString()}, 'admin')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
const userModel = mongoose.model('User', userSchema)

module.exports = userModel