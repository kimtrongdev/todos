const Router=require('express').Router()
const UserCT=require('./../controllers/authController')

Router.post('/api/login',UserCT.login)

Router.get('/api/auth',UserCT.loadData)
Router.post('/api/check_auth',UserCT.checkAuth)
module.exports =Router

