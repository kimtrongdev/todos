const Todos = require('./../model/Todo')

exports.index = async function (rq, res) {
    const todos = await Todos.find()
    res.json(todos)
}

exports.createList = async function (rq, res) {
    const name = rq.query.name || rq.params.name || rq.body.name

    let todo = new Todos({
        name: name,
        children: []
    })
    await todo.save()
    const todos = await Todos.find()
    res.json(todos)
}


exports.loadData = async function (rq, res) {

    let todo = new Todos({
        name: 'data test',
        children: [
            {
                name: 'tode test',
                desctiption: 'disss dfjgdfh',
                status: false,
                time: new Date('2020-03-29T06:24:01.890Z')
            }, {
                name: 'tode test2',
                desctiption: 'disss dfjgdfh',
                status: false,
                time: new Date('2020-03-11T06:24:01.890Z')
            }, {
                name: 'tode test3',
                desctiption: 'disss dfjgdfh',
                status: false,
                time: new Date('2020-03-17T06:24:01.890Z')
            }
        ]
    })
    await todo.save()
    const todos = await Todos.find()
    res.json(todos)
}

exports.addTodo = async function (rq, res) {
    const idList = rq.query.id_list
    Todos.findById(idList, async function (er, doc) {
        if (doc) {
            let children = doc.children
            children.push({
                name: rq.query.name
            })
            doc.children = children
            await doc.save()
            const todos = await Todos.find()
            res.json(todos)
        } else res.status(400).json({ message: 'ID list invalid' })
    })
}
exports.setTimeTodo = async function (rq, res) {
    const idList = rq.query.id_list
    const idTodo = rq.query.id_todo
    const time = rq.query.time

    Todos.findOne({ '_id': idList }, async (err, doc) => {
        if (doc) {
            let child = doc.children.id(idTodo)
            if (child) {
                child.time = time
                await doc.save()
                const todos = await Todos.find()
                res.json(todos)
            } else res.status(400).json({ message: 'ID todo invalid' })
        } else res.status(400).json({ message: 'ID list invalid' })
    })
    //await Todos.find({ _id: idList, 'children._id': idTodo }, { $set: { ['children.$.time']: Date.now() } })

}


exports.update = async function (rq, res) {
    const idList = rq.query._id
    const name = rq.query.name

    Todos.findOne({ '_id': idList }, async (err, doc) => {
        if (doc) {
            doc.name=name
            await doc.save()
            const todos = await Todos.find()
            res.json(todos)
        } else res.status(400).json({ message: 'ID list invalid' })
    })
}

exports.deleteTodo = async function (rq, res) {
    const idList = rq.query.id_list
    const idTodo = rq.query.id_todo

    Todos.findOne({ '_id': idList }, async (err, doc) => {
        if (doc) {
            let check=false;
            let children = doc.children.filter(function (child){
                if(child._id+'' ===idTodo){
                    check=true
                } 
                return child._id+''!==idTodo
            })
            if (check===true) {
                doc.children=children
                await doc.save()
                const todos = await Todos.find()
                res.json(todos)
            } else res.status(400).json({ message: 'ID todo invalid' })
        } else res.status(400).json({ message: 'ID list invalid' })
    })
}

exports.updateTodo = async function (rq, res) {
    const idList = rq.query.id_list
    const idTodo = rq.query.id_todo

    const time = rq.query.time
    const name = rq.query.name
    const status = rq.query.status
    const description = rq.query.description
    const priority = rq.query.priority
    Todos.findOne({ '_id': idList }, async (err, doc) => {
        if (doc) {
            let child = doc.children.id(idTodo)
            if (child) {
                if(time)
                    child.time = time
                if(name)
                    child.name = name
                if(description)
                    child.description = description
                if(status)
                    child.status = status
                if(priority){
                    if(['NONE','LOW','MEDIUM','HIGH'].indexOf(priority)!==-1){
                        child.priority = priority
                    }else{
                        res.status(400).json({ message: 'priority todo must one in [NONE,LOW,MEDIUM,HIGH]' })
                    }
                }
                await doc.save()
                const todos = await Todos.find()
                res.json(todos)
            } else res.status(400).json({ message: 'ID todo invalid' })
        } else res.status(400).json({ message: 'ID list invalid' })
    })
    //await Todos.find({ _id: idList, 'children._id': idTodo }, { $set: { ['children.$.time']: Date.now() } })

}