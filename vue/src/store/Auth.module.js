import ApiCaller from '../common/ApiCaller'
import axios from 'axios'
import { Promise } from 'core-js'
import router from './../router/index'
const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    auth: false
}

const actions = {
    ['LOGIN']({ commit }, user) {
        return new Promise((rs,rj)=>{
            commit('SET_LOADING_APP',true)
            ApiCaller('/api/login', 'POST', user).then((resp) => {
                const token = resp.data.token
                const user = resp.data.user
                localStorage.setItem('token', token)

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

                commit('AUTH_SUCCESS', token, user)
                commit('SET_LOADING_APP',false)
                rs()
            }).catch(() => {
               // localStorage.removeItem('token')
                commit('SET_LOADING_APP',false)
                rj()
            })
        })
    }
    ,
    ['CHECK_AUTH']({ commit },token) {
        return new Promise((rs,rj)=>{
            commit('SET_LOADING_APP',true)
            ApiCaller('/api/check_auth', 'POST', {token}).then((resp) => {
                const user = resp.data.user
                commit('AUTH_SUCCESS', token, user)
                commit('SET_LOADING_APP',false)
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                rs()
            }).catch(() => {
                //localStorage.removeItem('token')
                commit('SET_LOADING_APP',false)
                rj()
            })
        })
        
    },
    ['LOGOUT']({ commit }) {
        commit('AUTH_LOGOUT')
        localStorage.removeItem('token')
        router.push({ name: 'Login'})
    }
}

const mutations = {
    ['AUTH_SUCCESS'](state, token, user) {
        state.token = token
        state.user = user
        state.auth = true
    },
    ['AUTH_LOGOUT'](state) {
        state.token = null
        state.user = null
        state.auth = false
    },
    ['SET_AUTH'](state, auth) {
        state.auth = auth
    }
}

const getters = {
    isAuth(state) {
        return state.auth
    },
    token(state){
        return state.token
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}