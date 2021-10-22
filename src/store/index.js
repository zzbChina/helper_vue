import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        userData:'', // 用户数据
        readingInfo : '', // 阅读数据
        bookId : '', // 阅读书籍所需的索引号

    },
    mutations:{
        //登录成功后把信息写入vuex
        login(state,userData){
            state.userData = userData
        },
        //写入阅读数据
        reading(state,readingInfo){
            state.readingInfo = readingInfo
        },
        readBook(state,bookId){
            state.bookId = bookId
        }
    }
})