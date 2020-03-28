const state = {
    isLoaddingApp:false
}

const actions = {
   
}

const mutations = {
    ['SET_LOADING_APP'](state, data) {
        state.isLoaddingApp = data
    },
}

const getters= {
     isLoaddingApp(state){
         return state.isLoaddingApp
     }
}

export default {
    state,
    actions,
    mutations,
    getters
}