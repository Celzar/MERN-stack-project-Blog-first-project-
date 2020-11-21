// @-- set environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// @-- middlewares
const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
var path = require('path');

// @-- Database Connection

const config = require('./config/config')
config(app)

app.use('/public', express.static(path.join(__dirname, 'public')))

// @-- Passport Middlware
app.use(passport.initialize())

// @-- passport config
 require('./middleware/passport')(passport)

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// @-- Routing
require('./routes/routes')(app)


// @-- Assign PORT  
const PORT = process.env.PORT || 8000


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})