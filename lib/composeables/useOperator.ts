import { onMounted, type Ref } from 'vue'
import type { FilterValue } from './useFilters'
import { Operators, type AllOperators } from '../utils/Operators'

export default function useOperator<T extends AllOperators[]>(
  value: Ref<FilterValue>,
  supportedOperators: T,
  defaultOperator: T[number]
) {
  onMounted(() => {
    value.value.opr = defaultOperator
  })

  const operators = new Operators().pick(supportedOperators)

  return operators
}
