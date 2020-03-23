import Vue from 'vue'
import Vuex from 'vuex'
import Todo from './Todo.module'
Vue.use(Vuex)

export default new Vuex.Store({
 modules:{
  Todo
 }
})
