import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'


Vue.use(Router);
export default new Router({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        { path: '/', component: Home },
    ]
})