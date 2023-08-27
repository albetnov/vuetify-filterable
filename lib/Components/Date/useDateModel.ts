import { onMounted, ref, toRef } from 'vue'
import type { FilterValue } from '../../composeables/useFilters'
import { withEqAndNeq } from '../../utils/helpers'

export default function useDateModel<T extends { modelValue: FilterValue }>(
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

  const isMenuOpen = ref(false)

  const handleOnSave = () => {
    isMenuOpen.value = false
  }

  return {
    value,
    operators,
    isMenuOpen,
    handleOnSave
  }
}
