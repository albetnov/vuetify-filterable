import { createApp } from 'vue'
import App from './App.vue'
import Example from '../lib/vue-plugin-template'

createApp(App).use(Example, { test: true }).mount('#app')
