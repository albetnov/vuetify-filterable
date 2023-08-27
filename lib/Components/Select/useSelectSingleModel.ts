import type { FilterValue } from '../../composeables/useFilters'
import { withEqAndNeq } from '../../utils/helpers'
import { onMounted, toRef } from 'vue'

export default function useSelectSingleModel<T extends { modelValue: FilterValue }>(
  props: T,
  defaultOperator: 'eq' | 'neq'
) {
  const operators = withEqAndNeq()

  const value = toRef(() => props.modelValue)

  onMounted(() => {
    value.value.opr = defaultOperator
  })

  return {
    operators,
    value
  }
}
