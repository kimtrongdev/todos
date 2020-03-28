const Router=require('express').Router()
const TodoCT=require('./../controllers/todoController')
const MidAuth = require('./middware')
Router.get('/api/todos',MidAuth.auth,TodoCT.index)

Router.post('/api/todos',MidAuth.auth,TodoCT.createList)
Router.post('/api/todos/add',MidAuth.auth,TodoCT.addTodo)
Router.get('/api/todos/loadData',MidAuth.auth,TodoCT.loadData)
Router.post('/api/todos/time',MidAuth.auth,TodoCT.setTimeTodo)
Router.post('/api/todos/update',MidAuth.auth,TodoCT.update)
Router.post('/api/list/todo/update',MidAuth.auth,TodoCT.updateTodo)
Router.post('/api/todos/deleteTodo',MidAuth.auth,TodoCT.deleteTodo)
module.exports =Router