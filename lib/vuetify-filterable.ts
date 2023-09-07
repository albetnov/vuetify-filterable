import { type App } from 'vue'
import Filterable from './Components/Filterable.vue'
import Operator from './Components/Operator.vue'

export default {
  install(app: App, options?: { alias?: string; oprAlias?: string }) {
    const name = options?.alias ?? 'v-filterable'

    app.component(name, Filterable).component(`${name}-operator`, Operator)
  }
}
