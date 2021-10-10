//引入路由
import VueRouter from 'vue-router'

import Home from '../pages/home/Home'

//引入翻译组件
import TranslateMain from '../pages/translate/TranslateMain'

export default new VueRouter({
    routes:[
        {path : '/',redirect:'/home'},
        {
            path : '/home',
            component : Home,
        },
        {
            path : '/translate',
            component : TranslateMain
        }
    ]
})

