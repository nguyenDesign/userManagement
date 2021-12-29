const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const auth = async function(req,res,next){
    try{
        let token = req.cookies['auth-token']
        let decode = jwt.verify(token, 'admin')
        let user = await User.findOne({_id: decode.id, "tokens.token": token})
        if (!user){
            throw new Error()
        }
        req.token = token
        next()
    }catch(e){
        res.status(401).redirect('/api/user/login')
    }
}

module.exports = auth