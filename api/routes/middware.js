const jwt = require('./../helpers/jwt')

module.exports.auth=function ( rq, res, next){
    try {
        const token = rq.query.token || rq.params.token || rq.body.token
        if(token){
            jwt.verifyToken(token,'abc').then( (decode) =>{
                rq.user= decode.data
                next()
            }).catch(() =>{
                res.status(401).json({message : 'Token failed'})
            })
        }else next()
    } catch (error) {
        res.status(401).json({message : 'Empty token'})
    }
}