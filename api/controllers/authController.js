const bcrypt = require('bcrypt')
const uuidv4 = require('uuid/v4')
const sharp = require('sharp')
const path = require('path')

//model
const User = require('./../Model/User')

exports.index = async function (rq, res) {
    const users = await User.find()
    res.send(users)
}

exports.store = async function (rq, res) {
    const hash = bcrypt.hashSync(rq.body.user.password, 8)
    const user = new User({
        username:rq.body.user.username,
        email: rq.body.user.email,
        password: hash
    })
    await user.save()
    res.json({
        user
    })
}

exports.delete = async function (rq, res) {
    const r = await User.remove({ _id: rq.params.id })
    res.redirect('/user/index')
}

exports.update = async function (rq, res) {
    User.findById(rq.params.id, function (err, user) {
        if (!err) {
            if (rq.query.email)
                user.email = rq.query.email
            if (res.query.password)
                user.password = md5(rq.query.password)

            user.save()
            res.redirect('/user/index')
        }
    })
}

exports.login = async function (rq, res) {
    User.findOne({ email: rq.body.user.email }, null, async function (err, user) {
        if (user) {
            const passroot = await bcrypt.compare(rq.body.user.password, user.password)
            if (passroot === true) {
                const cookie = uuidv4() + Date.now()
                user.token = cookie
                await user.save()
                const rpUser={
                    id:user._id,
                    email:user.email,
                    username:user.username,
                    token:cookie
                }
               
                res.json({ user : rpUser }).status(200)
            } else {
                res.json({ 'Message': false }).status(404)
            }
        } else res.json({ 'Message': false }).status(404)
    })
}

exports.getUserDetail = function (rq, res) {
    User.findOne({ token: rq.body.token }, null, async function (err, user) {
        
        res.json({result:user})
    })
}



exports.postImage = async function (rq, res) {
    const nameRandom = uuidv4() + '.png'
    const pathFile = path.resolve('public/images/' + nameRandom)
    res.json(rq.file)
    if (rq.file) {
        const file = rq.file.buffer
        sharp(file).toFile(pathFile)
    }
}


exports.deleteByEmail = async function (rq, res) {
    const email = rq.query.email
    const users = await User.findByEmail(email)
    users.forEach(async (user) => {
        await User.remove({ _id: user._id })
    });
    res.redirect('/user/index')
}