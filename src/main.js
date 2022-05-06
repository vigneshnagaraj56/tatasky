import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false
Vue.use(Antd);

var VueMount = new Vue({
  data: { searchString: "Test", message: '' }, 
  router, 
  methods: {
    onLodFn(){
      console.log("vuemount onload fn")
    }
  },
  render: h => h(App)
}).$mount('#app')

VueMount.onLodFn();