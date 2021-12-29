mongoose = require('mongoose')
const User = require('./model/userModel')

mongoose.connect("mongodb://localhost:27017/yelp-camp",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{
    console.log("Database connect")
}).catch((err)=>{
    console.log(err)
    throw err
})

User.find().then(async (allUser)=>{
    for (let user of allUser){
        if (typeof user.address === "undefined"){
            user.address = "Update later"
            await user.save()
        }

    }
})


