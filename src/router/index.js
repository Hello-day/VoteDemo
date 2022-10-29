import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
    // 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        // 一级路由
        {
            path: '/',
            redirect: 'login'
        },
        {
            path: '/login',
            name: 'Login',
            component: () =>
                import ("../pages/Login.vue")
        },
        {
            path: '/manage',
            name: 'Manage',
            redirect: 'manage/home',
            component: () =>
                import ("../pages/Manage.vue"),
            children: [
                {
                    path:'home',
                    name:'Home',
                    component: ()=> import("../pages/Home"),
                },
                {
                    path:'Participate',
                    name:'Participate',
                    component: ()=> import("../pages/Participate"),
                },

                {
                    path:'Create',
                    name:'Create',
                    component: ()=> import("../pages/Create"),
                },

                {
                    path:'VoteContent',
                    name:'VoteContent',
                    component: ()=> import("../pages/VoteContent"),
                },
                {
                    path:'VotePage',
                    name:'VotePage',
                    component: ()=> import("../pages/VotePage"),
                },
                {
                    path:'VoteResult',
                    name:'VoteResult',
                    component: ()=> import("../pages/VoteResult"),
                },
            ]
        }

    ]
})