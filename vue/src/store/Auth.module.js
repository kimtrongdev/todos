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
        ApiCaller('/api/login', 'POST', user).then((resp) => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
           
        }).catch(() => {
            localStorage.removeItem('token')
           
        })
    }
}

const mutations = {
    ['auth_success'](state, token, user) {
        state.token = token
        state.user = user
    },

    ['SET_AUTH'](state, auth) {
        state.auth = auth
    }
}

const getters = {
    isAuth(state) {
        return state.auth
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}