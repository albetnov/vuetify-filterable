import { h, type App } from 'vue'
import about from './about'
import './style.css'

export default {
  install(app: App, options?: object) {
    console.log(about('Vue Plugin Template'))
    if (options) {
      console.log('Some options: ', options)
    }

    app.component('hello-world', h('h1', 'Hello World!'))
  }
}
