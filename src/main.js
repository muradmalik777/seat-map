import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from "./router";
import Vuetify from 'vuetify'
import "./assets/scss/theme.scss"


Vue.use(Vuetify)

Vue.config.productionTip = false

var vueInstance = new Vue({
  el: "#app",
  template: "<App/>",
  router,
  render: h => h(App)
});

export default vueInstance;
