const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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
        enum: ['admin', 'customer']
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

const userModel = mongoose.model('User', userSchema)

module.exports = userModel