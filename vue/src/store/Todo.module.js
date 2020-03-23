import ApiCaller from './../common/ApiCaller'

const state = {
    todos: [],
}

const actions = {
    ['LOAD'](context) {
        ApiCaller('/api/todos').then((res) => {
            if (res && res.data) {
                context.commit('SET_TODOS', res.data)
            }

        })
    },
    ['CREATE_LIST'](context, data) {
        ApiCaller('/api/todos', 'POST', data).then((res) => {
            if (res && res.data)
                context.commit('SET_TODOS', res.data)
        })

    },
    ['ADD_TODO'](context, data) {
        ApiCaller('/api/todos/add', 'POST', data).then((res) => {
            if (res && res.data){
                context.commit('SET_TODOS', res.data)
            } 
        })
    },
    ['UPDATE_LIST'](context, data) {
        ApiCaller('/api/todos/update', 'POST', data).then((res) => {
            if (res && res.data){
                context.commit('SET_TODOS', res.data)
            } 
        })
    },
    ['DELETE_TODO'](context, data) {
        ApiCaller('/api/todos/deleteTodo', 'POST', data).then((res) => {
            if (res && res.data){
                context.commit('SET_TODOS', res.data)
            } 
        })
    },
    ['UPDATE_TODO'](context, data) {
        ApiCaller('/api/list/todo/update', 'POST', data).then((res) => {
            if (res && res.data){
                context.commit('SET_TODOS', res.data)
            } 
        })
    }
}

const mutations = {
    ['SET_TODOS'](state, todos) {
        state.todos = todos
    }
}

const getters = {
    lists(state) {
        return state.todos
    },
    listToday(state) {
        let listToday = []
        state.todos.forEach(item => {
            item.children.forEach(function (child) {
                const today = new Date()
                const time = new Date(child.time)
                if (today.getDate() === time.getDate()) {
                    child.listName = item.name
                    child.list_id = item._id
                    listToday.push(child)
                }
            })
        });
        return listToday
    },
    allTodo(state) {
        let listToday = []
        state.todos.forEach(item => {
            item.children.forEach(function (child) {
                child.listName = item.name
                child.id_list = item._id
                listToday.push(child)
            })
        });

        listToday.sort(function (a, b) {
            const today = new Date(a.time)
            const time = new Date(b.time)
            return today.getTime() - time.getTime()
        })

        //console.log(listToday)
        let ob = []
        while(listToday.length>0){
            let indexLast=1
            listToday.forEach((element , index) => {
                const dateItem1 = new Date(listToday[0].time)
                const dateItemNow = new Date(element.time)
                if(dateItem1.getDate() === dateItemNow.getDate())
                    indexLast=index+1
            });

            let nameDate=''
            const dateItem = new Date(listToday[0].time)
            const dateNow=new Date()
            const d=Math.floor( dateItem.getTime()/86400000 ) - Math.floor( dateNow.getTime()/86400000 )
            if(d===0){

                nameDate="Today"
            }else if(d===1){
                nameDate="Tomorow"
            }else if(d<0){
                if(d===-1)
                nameDate="Yesterday"
                else
                nameDate=d*-1+" Ngay truoc"
            }else if( d>1 && d<6 ){
                const day=dateItem.getDay()
                if(day===0)
                    nameDate='CN'
                else 
                    nameDate='Thu '+(day+1)
            }else{
                nameDate= 'Thang '+(dateItem.getMonth() +1 )
            }
            
            const rs={
                dateName: nameDate,
                children:listToday.splice(0,indexLast)
            }
            ob.push(rs)
        }
        return [...ob]
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}