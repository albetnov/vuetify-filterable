import { type App } from 'vue'
import Filterable from './Components/Filterable.vue'

export default {
  install(app: App, options?: { alias?: string }) {
    app.component(options?.alias ?? 'v-filterable', Filterable)
  }
}
