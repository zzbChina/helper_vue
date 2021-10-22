//引入路由
import VueRouter from 'vue-router'

import Home from '../pages/home/Home'

//引入翻译组件
import TranslateMain from '../pages/translate/TranslateMain'
import TranslateDetail from '../pages/translate/TranslateDetail'

//引入写作组件
import WriteMain from '../pages/write/WriteMain'
import WriteDetail from '../pages/write/WriteDetail'

//引入阅读组件
import ReadingMenu from '../pages/reading/ReadingMenu'
import ReadingItem from '../pages/reading/ReadingItem'

//引入个人用户组件
import User from '../pages/user/User'

//引入书籍组件
import Book from '../pages/book/Book'
import BookForeword from '../pages/book/BookForeword'

//引入听力组件
import MockExam from '../pages/listening/MockExam'
import BeginMockExam from '../pages/listening/BeginMockExam'

//引入其他组件
import Advise from '../pages/other/Advise'

export default new VueRouter({
    routes:[
        {path : '/',redirect:'/home'},
        {
            path : '/home',
            component : Home,
        },
        {
            path : '/translate',
            component : TranslateMain,
            children:[
                {
                    path : '/translate/translate_detail',
                    component : TranslateDetail
                }
            ]
        },
        {
            path : '/reading_menu',
            component : ReadingMenu
        },
        {
            path : '/reading',
            component : ReadingItem
        },
        {
            path : '/User',
            component : User
        },
        {
            path : '/write',
            component : WriteMain,
            children:[
                {
                    path : '/write/write_detail',
                    component : WriteDetail
                }
            ]
        },
        {
            path : '/book',
            component:Book
        },
        {
            path : '/book_foreword',
            component : BookForeword
        },
        {
            path : '/mock_exam',
            component : MockExam
        },
        {
            path : '/exam',
            component : BeginMockExam
        },
        {
            path : '/advise',
            component : Advise
        }
    ]
})

