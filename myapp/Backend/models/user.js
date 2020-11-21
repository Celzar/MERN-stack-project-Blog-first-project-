const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    username: {
        type: String,
        maxLength: 30
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 5,
    },
    loginDate: {
        type: Date,

    },

    img: {
        type: String
    },
    imgExtension: {
        type: String
    }

    // role:{
    //     type: String,
    //     role:['user','admin'],
    //     default: 'user'
    // }


    // Like:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'user'
    // }]

    // Commentted: [{
    //     Articles: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'articles'
    //     },
    //     text: String
    // }],

    // following: [{
    //     followed: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'user'
    //     }
    // }],

    // subscribers: [{
    //     follower: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'user'
    //     }
    // }]

},
    { timestamps: true }
)



const user = mongoose.model('user', userSchema);
module.exports = user

