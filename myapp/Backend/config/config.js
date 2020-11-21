
// *-- config for connecting database 

// @-- middlewares  
const morgan = require('morgan')
const compression = require('compression')
const mongoose = require('mongoose')

// @-- environment 
// $-- checking environment development or production
// #-- use morgan('dev') with development or use compression with production 

const production = require('./production')
const development = require('./development')

module.exports = (app)=>{
    if(process.env.NODE_ENV === "development"){
        app.use(morgan('dev'))
        mongoose.connect(development.mongoURI, {useNewUrlParser:true,useFindAndModify: false})
            .then(()=>{
                console.log('Database Connection is successful')
            }).catch((err)=>{
                console.error(err)
            })
    }else{
        app.use(compression())
        mongoose.connect(production.mongoURI, {useNewUrlParser: true,useFindAndModify: false})
            then(()=>{
                console.log('Database Connection is successful')
            })
            .catch((err)=>{
                console.error(err)
            })
    }


}