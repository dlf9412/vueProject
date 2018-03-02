import Vue from 'vue';
import echarts from 'echarts';
import axios from 'axios';
import ElementUI from 'element-ui';
import router from './router';
import App from './App';
import 'babel-polyfill'

Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;

// // import Vue from "vue";
// import { Container, Header, Aside, Main, Button, Input, Slider, DatePicker, MessageBox, Message, Progress, Steps, Step, Pagination } from "element-ui";
// // import {MessageBox} from "element-ui";
//
// Vue.use(Container);
// Vue.use(Header);
// Vue.use(Aside);
// Vue.use(Main);
// Vue.use(Button);
// Vue.use(Steps);
// Vue.use(Step);
// Vue.use(Input);
// Vue.use(Slider);
// Vue.use(DatePicker);
// Vue.use(Progress);
// Vue.use(Pagination);
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$message = Message;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert

Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App />'
});
