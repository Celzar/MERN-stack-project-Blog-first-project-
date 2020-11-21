const Bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const multer = require('multer')
// @-- Model
const User = require('../models/user')
const Model_Articles = require('../models/Articles')
const Img = require('../models/ImgModel')
// @-- Validation middleware
const ValidateLogin = require('../validates/ValidatedLogin')
const ValidatedRegister = require('../validates/ValidatedRegister')
const fs = require('fs')
// @-- import secret key
const key = require('../config/development')



// const passport = require('passport')

// @-- passport config
// require('../middleware/passport')(passport)

var imgBase64 = '';
var imgExtension = '';


// @--config multer
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, data) => {
        const ext = path.extname[file.originalname]
        if (ext !== '.jpg' || ext !== '.png' || ext !== '.gif') {
            return cb(res.status(400).end('only jpg, png, gif are allowed'), false)
        }

        cb(null, true)
    }

})

var upload = multer({ storage: storage }).single('image')


module.exports = (app) => {

    // @-- Login Endpoint
    app.post('/login', (req, res) => {
        const { errors, isValid } = ValidateLogin(req.body)

        // @-- Check validation
        if (!isValid) return res.status(400).json({ errors })

        const email = req.body.email
        const password = req.body.password

        // Find user by email
        User.findOne({ email }).then(user => {
            // @-- Check if user exists
            if (!user) return res.status(404).json({ emailnotfound: "Email not found" })

            // @-- Check password
            Bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User matched
                        // Create JWT Payload
                        const payload = {
                            id: user.id,
                            name: user.name
                        }

                        // @-- Sign token
                        JWT.sign(
                            payload,
                            key.SecretOrKey,
                            { expiresIn: 31556926 },// 1 year in seconds
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer" + token
                                })
                            }
                        )
                    } else {
                        return res
                            .status(400)
                            .json({ passwordincorrect: "Password is incorrect" })
                    }
                })

            // const loginDate = new User({ loginDate: new Date() })
            // loginDate.save().then(res => console.log(res)).catch(err => console.log(err))


        })
    })


    app.post('/register', (req, res) => {
        const { errors, isValid } = ValidatedRegister(req.body)

        if (!isValid) { return res.status(400).json({ errors }) }
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    return res.status(400).json({ email: "Email already exists" });
                } else {
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                    })
                    // @-- Hash password
                    Bcrypt.genSalt(10, (err, salt) => {
                        Bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => res.json({ success: true, user }))
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
    })


    app.post('/uploadImages', (req, res) => {
        upload(req, res, function (err) {
            console.log(req.file)
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            return res.json({
                link: `http://localhost:8000/${res.req.file.destination}${res.req.file.filename}`
            })
        })
    })


    app.post('/uploadcontent', (req, res) => {
        const article = new Model_Articles({
            title: req.body.title,
            content: req.body.content,
            Author: req.body.id,
            foreword: req.body.foreword,
            img: req.body.img ? new Buffer(imgBase64).toString('base64') : '',
            imgExtension: imgExtension
        })

        article.save().then(data => {
            res.json({
                success: true,
                message: 'your content was posted successfully',
            })
        }).catch(err => console.log(err))

    })


    app.post('/uploadAsBase64', (req, res) => {
        // convert binary data to base64 encoded string

        upload(req, res, function (err) {
            console.log(req.file)
            imgBase64 = fs.readFileSync(req.file.path);
            imgExtension = req.file.mimetype;
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            return res.json({
                // link: `http://localhost:8000/${res.req.file.destination}${res.req.file.filename}`
                success: true,

            })
        })
    })

    app.post('/uploadUserProfile', (req, res) => {
        const userImgData = {
            _id: req.body.userId,
            img: req.body.img ? new Buffer(imgBase64).toString('base64') : '',
            imgExtension: imgExtension
        }

        User.findOneAndUpdate(userImgData._id, { img: userImgData.img, imgExtension: userImgData.imgExtension })
            .then(data => {
                res.json({
                    success: true,
                    data: data
                })
            })
    })


    app.get('/contents', (req, res) => {
        Model_Articles.find({})
            .populate('Author', 'username')
            .exec((err, contents) => {
                if (err) return res.status(400).send(err)
                return res.status(200).json({
                    success: true,
                    contents
                })
            })
    })

    app.post('/read/:_id', (req, res) => {
        Model_Articles
            .find({ "_id": req.params._id })
            .populate("Author", "username")
            .exec((err, data) => {
                if (err) return res.send(err)
                return res.status(200).json({
                    success: true,
                    data
                })
            })
    })

    app.post('/blogList/:userId', (req, res) => {
        Model_Articles
            .find({ Author: req.params.userId })
            .populate("Author", "username")
            .exec((err, data) => {
                if (err) return res.send(err)
                return res.json({ success: true, data })
            })
    })


    app.post('/getUser/:userId', (req, res) => {
        User.find({ '_id': req.params.userId })
            .then(data => {
                console.log(data[0].imgExtension)
                res.json({ success: true, username: data[0].username, imgExtension: data[0].imgExtension, img: data[0].img, email: data[0].email })
            })
    })


    app.post('/updateContent', (req, res) => {

        const toUpdateData = {
            id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            Author: req.body.id,
            foreword: req.body.foreword,
            img: req.body.img ? new Buffer(imgBase64).toString('base64') : '',
            imgExtension: imgExtension
        }

        Model_Articles.findOneAndUpdate(
            toUpdateData.id,
            {
                title: toUpdateData.title,
                content: toUpdateData.content,
                Author: toUpdateData.id,
                foreword: toUpdateData.foreword,
                img: toUpdateData.img ? new Buffer(imgBase64).toString('base64') : '',
                imgExtension: imgExtension
            }
        ).then((data) => {
            if (data) {
                return res.json({
                    success: true,
                    data,
                    message: 'your content was posted successfully'
                })
            }
        }).catch((error) => {
            console.log(error)
        })

    })

    app.post('/deleteContent', (req, res) => {

        Model_Articles.findOneAndDelete({ _id: req.body.id })
            .then((data => {
                if (data) {
                    return res.json({
                        success: true,
                        data
                    })
                }
            })).catch(error => console.log(error))

    })




}