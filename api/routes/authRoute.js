const Router=require('express').Router()
const UserCT=require('./../controllers/authController')

Router.post('/api/login',UserCT.login)

module.exports =Router