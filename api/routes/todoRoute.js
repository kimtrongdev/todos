const Router=require('express').Router()
const TodoCT=require('./../controllers/todoController')

Router.get('/api/todos',TodoCT.index)
Router.post('/api/todos',TodoCT.createList)
Router.post('/api/todos/add',TodoCT.addTodo)
Router.get('/api/todos/loadData',TodoCT.loadData)
Router.post('/api/todos/time',TodoCT.setTimeTodo)
Router.post('/api/todos/update',TodoCT.update)
Router.post('/api/list/todo/update',TodoCT.updateTodo)
Router.post('/api/todos/deleteTodo',TodoCT.deleteTodo)
module.exports =Router