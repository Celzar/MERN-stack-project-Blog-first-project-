const mongoose = require('mongoose')

const ArticlesSchema = mongoose.Schema({

    title: {
        type: String,
    },
    foreword: {
        type: String
    },

    content: {
        type: String
    },

    //references
    // Like: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user'
    // }],

    Author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    publicDate: {
        type: Date,
        default: new Date()
    },

    img: {
        type: String
    },
    imgExtension: {
        type: String
    }

    // Img:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'ImgModel'
    // }

    // Image: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'image'
    // }],

}, {
        timestamps: true
    })




const Articles = mongoose.model('article', ArticlesSchema)
module.exports = Articles