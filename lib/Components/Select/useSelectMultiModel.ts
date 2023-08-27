import type { FilterValue } from 'lib/composeables/useFilters'
import { computed, onMounted, toRef } from 'vue'

export default function useSelectMultiModel<T extends { modelValue: FilterValue }>(
  props: T,
  defaultOperator: 'in' | 'not_in' | 'have_all'
) {
  const value = toRef(() => props.modelValue)

  onMounted(() => {
    value.value.opr = defaultOperator
  })

  const operators = [
    {
      label: 'In',
      value: 'in'
    },
    {
      label: 'Not In',
      value: 'not_in'
    },
    {
      label: 'Have All',
      value: 'have_all'
    }
  ]

  const fieldValue = computed({
    get() {
      return value.value.val?.split(',') ?? []
    },
    set(val: string[]) {
      if (val.length <= 0) {
        value.value.val = null
        console.log('this')
        return
      }

      value.value.val = val.join(',')
    }
  })

  return {
    operators,
    value,
    fieldValue
  }
}
