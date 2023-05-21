import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



export default new Vuex.Store({
    state:{
        token: null,
        userInfo:null,
        commentIndex: -1,
        loadInfo:null,
        search:null
    },
    getters:{
        token: (state)=>{
            state.token
        },
        userInfo: (state)=>{
            state.userInfo
        },
        commentIndex:(state)=>{
            state.commentIndex
        },
        loadInfo:(state)=>{
            state.loadInfo
        },
        search:(state)=>{
            state.search
        }

    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setUserInfo(state,userInfo){
            state.userInfo = userInfo
        },
        setcommentIndex(state,commentIndex){
            state.commentIndex =commentIndex
        },
        setLoadInfo(state,loadInfo){
            state.loadInfo = loadInfo
        },
        setSearch(state,search){
            state.search = search
        }
    }
})
