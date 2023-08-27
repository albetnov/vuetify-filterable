import type { FilterValue } from '../../composeables/useFilters'
import { withEqAndNeq } from '../../utils/helpers'
import { onMounted, toRef } from 'vue'

export default function useNumberModel<T extends { modelValue: FilterValue }>(
  props: T,
  defaultOperator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte'
) {
  const value = toRef(() => props.modelValue)

  onMounted(() => {
    value.value.opr = defaultOperator
  })

  const operators = withEqAndNeq([
    {
      label: 'Greater Than',
      value: 'gt'
    },
    {
      label: 'Less Than',
      value: 'lt'
    },
    {
      label: 'Greater Than or Equal',
      value: 'gte'
    },
    {
      label: 'Less Than or Equal',
      value: 'lte'
    }
  ])

  return {
    operators,
    value
  }
}
