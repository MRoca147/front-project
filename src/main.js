import { createApp } from 'vue'
//import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

// new Vue({
//   render: h => h(App),
//   store: store,
//   router,
// }).$mount('#app')
createApp(App).use(router).use(store).mount('#app')
