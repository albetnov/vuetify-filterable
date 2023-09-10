import { computed, type Ref } from 'vue'
import type { FilterValue } from './useFilters'

export default function useArrayable(value: Ref<FilterValue>) {
  return computed({
    get() {
      if (Array.isArray(value.value.val)) return value.value.val

      if (typeof value.value.val !== 'string') return []

      return value.value.val.split(',')
    },
    set(val: string[]) {
      if (val.length <= 0) {
        value.value.val = null
        return
      }

      value.value.val = val.join(',')
    }
  })
}
