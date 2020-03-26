const Router=require('express').Router()
const UserCT=require('./../controllers/authController')

Router.get('/api/todos',TodoCT.index)

module.exports =Router