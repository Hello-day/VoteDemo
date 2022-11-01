import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import request from "./utils/request.js";

import vueResource from 'vue-resource'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import * as echarts from "echarts";


Vue.use(ElementUI,{size:'mini'});
Vue.config.productionTip = false
Vue.use(vueResource)
Vue.use(VueRouter)
Vue.prototype.$axios = axios


Vue.prototype.$echarts = echarts;

Vue.prototype.request = request;
Vue.prototype.$echarts = echarts
new Vue({
    render: h => h(App),
    router: router,
    //安装全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
    }
}).$mount('#app')