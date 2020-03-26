import Vue from 'vue'
import Vuex from 'vuex'
import Todo from './Todo.module'
import Color from './color'
Vue.use(Vuex)

export default new Vuex.Store({
 modules:{
  Todo,
  Color
 }
})
