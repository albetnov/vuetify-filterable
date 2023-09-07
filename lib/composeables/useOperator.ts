import { onMounted, type Ref } from 'vue'
import type { FilterValue } from './useFilters'
import { type AllOperators } from '../utils/Operators'

export default function useOperator<T extends AllOperators[]>(
  value: Ref<FilterValue>,
  supportedOperators: T,
  defaultOperator: T[number],
  allowedOperator?: AllOperators[]
) {
  onMounted(() => {
    value.value.opr = defaultOperator
  })

  const operators = allowedOperator
    ? supportedOperators.filter((item) => allowedOperator.includes(item))
    : supportedOperators

  return operators
}
