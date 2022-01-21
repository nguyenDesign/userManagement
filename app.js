const express = require('express')
const app = express()
const PORT = 3001
const mongoose = require('mongoose')
const path = require('path')
const userRoute = require('./routes/users')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const cookieParser = require('cookie-parser')
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{
    console.log("Database connected")
}).catch(err=>{
    console.log("Database cannot be connected")
    throw err
})

app.set("views", path.join(__dirname,"views"))
app.set("view engine", "ejs")
app.engine('ejs', ejsMate)
//Set up body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,"public")))
//Set up the routes
app.use('/api/user', userRoute)

app.listen(PORT, ()=>{
    console.log("User service is deployed on port: " + PORT)
})