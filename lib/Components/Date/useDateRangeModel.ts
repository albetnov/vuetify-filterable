import type { FilterValue } from '../../composeables/useFilters'
import { onMounted, ref, toRef } from 'vue'

export default function useDateRangeModel<T extends { modelValue: FilterValue }>(
  props: T,
  defaultOperator: 'in' | 'not_in'
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
    }
  ]

  const isMenuOpen = ref(false)

  const handleOnSave = () => {
    isMenuOpen.value = false
  }

  return { value, operators, isMenuOpen, handleOnSave }
}
