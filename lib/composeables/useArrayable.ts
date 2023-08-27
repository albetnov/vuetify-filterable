import { computed, type Ref } from 'vue'
import type { FilterValue } from './useFilters'

export default function useArrayable(value: Ref<FilterValue>) {
  return computed({
    get() {
      return value.value.val?.split(',') ?? []
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
