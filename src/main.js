// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';

import store from './store/index';
import VueToast from 'vue2-toast';
import 'vue2-toast/lib/toast.css';
import VuePreview from 'vue-preview';
import axios from 'axios';
axios.defaults.baseURL = 'http://api.sami.han-zi.cn';
axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';

Vue.prototype.$ajax = axios;

// with parameters install
Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: {top: 0, bottom: 0},
    captionEl: true,
    fullscreenEl: true,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
})

Vue.use(VueToast, {
    defaultType: 'center'
})
Vue.use(Vuex);
new Vue({
    el: '#app',
    store: store,
    template: '<App/>',
    components: {App}
})
