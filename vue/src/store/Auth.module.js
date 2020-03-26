import ApiCaller from '../common/ApiCaller'
import axios from 'axios'
const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    auth: false
}

const actions = {
    ['LOGIN']({ commit }, user) {
        return new Promise((resolve, reject) => {
            ApiCaller('/api/login', 'POST', user).then((resp) => {
                const token = resp.data.token
                const user = resp.data.user
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', token, user)
                resolve(resp)
            }).catch(err => {
                commit('auth_error')
                localStorage.removeItem('token')
                reject(err)
            })

        })
    }
}

const mutations = {
    ['SET_USER'](state, user) {
        state.user = user
    },
    ['SET_AUTH'](state, auth) {
        state.auth = auth
    }
}

const getters = {
    isAuth(state){
        return state.auth
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}