import { withEqAndNeq } from '../../utils/helpers'
import type { FilterValue } from '../../composeables/useFilters'
import { onMounted, toRef } from 'vue'

export default function useTextModel<T extends { modelValue: FilterValue }>(
  props: T,
  defaultOperator: 'eq' | 'neq' | 'contains' | 'starts_with' | 'ends_with' | 'not_contains'
) {
  const value = toRef(() => props.modelValue)

  onMounted(() => {
    value.value.opr = defaultOperator
  })

  const operators = withEqAndNeq([
    {
      label: 'Contains',
      value: 'contains'
    },
    {
      label: 'Starts With',
      value: 'starts_with'
    },
    {
      label: 'Ends With',
      value: 'ends_with'
    },
    {
      label: 'Not Contains',
      value: 'not_contains'
    }
  ])

  return {
    operators,
    value
  }
}
