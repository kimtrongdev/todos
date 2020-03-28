const bcrypt = require('bcrypt')
const jwt = require('./../helpers/jwt')

//model
const User = require('./../model/User')

exports.loadData = async function (rq, res) {
    let user = new User({
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin', 8),
        auth: 'admin'
    })
    await user.save()
}

// exports.index = async function (rq, res) {
//     const users = await User.find()
//     res.send(users)
// }

// exports.store = async function (rq, res) {
//     const hash = bcrypt.hashSync(rq.body.user.password, 8)
//     const user = new User({
//         username:rq.body.user.username,
//         email: rq.body.user.email,
//         password: hash
//     })
//     await user.save()
//     res.json({
//         user
//     })
// }

// exports.delete = async function (rq, res) {
//     const r = await User.remove({ _id: rq.params.id })
//     res.redirect('/user/index')
// }

// exports.update = async function (rq, res) {
//     User.findById(rq.params.id, function (err, user) {
//         if (!err) {
//             if (rq.query.email)
//                 user.email = rq.query.email
//             if (res.query.password)
//                 user.password = md5(rq.query.password)

//             user.save()
//             res.redirect('/user/index')
//         }
//     })
// }

exports.login = async function (rq, res) {
    User.findOne({ email: rq.query.email }, null, async function (err, user) {
        if (user) {
            const passroot = await bcrypt.compare(rq.query.password, user.password)
            if (passroot === true) {
                const rpUser = {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
                jwt.generateToken(rpUser , process.env.ACCESS_TOKEN_SECRET , process.env.ACCESS_TOKEN_LIFE).then((token)=>{
                    res.status(200).json({ user: rpUser, token , message: 'Login success' })
                }).catch((er)=>{
                    res.status(400).json({ message: 'Generate Token Failed' ,error:er}) 
                })
            } else {
                res.status(401).json({ 'message': 'Password invalid' })
            }
        } else res.status(400).json({ 'message': 'User not found' })
    })
}

exports.checkAuth = async function (rq, res) {
    jwt.verifyToken(rq.query.token, process.env.ACCESS_TOKEN_SECRET ).then((decode)=>{
        res.status(200).json({ user: decode.data })
    }).catch((error)=>{
        res.status(400).json({ 'message': 'Token failed',error })
    })
}





// exports.postImage = async function (rq, res) {
//     const nameRandom = uuidv4() + '.png'
//     const pathFile = path.resolve('public/images/' + nameRandom)
//     res.json(rq.file)
//     if (rq.file) {
//         const file = rq.file.buffer
//         sharp(file).toFile(pathFile)
//     }
// }


// exports.deleteByEmail = async function (rq, res) {
//     const email = rq.query.email
//     const users = await User.findByEmail(email)
//     users.forEach(async (user) => {
//         await User.remove({ _id: user._id })
//     });
//     res.redirect('/user/index')
// }