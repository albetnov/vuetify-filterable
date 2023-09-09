import type { AllOperators } from '../utils/Operators'
import { provide, reactive } from 'vue'

export interface Entry {
  label: string
  key: string
}

export interface Filter {
  label: string
  field: string
  type:
  | 'select'
  | 'select-multiple'
  | 'date'
  | 'date-range'
  | 'string'
  | 'number'
  | 'range'
  | 'boolean'
  | 'custom'
  customId?: string
  entries?: Entry[]
  operators?: AllOperators[]
  itemLabels?: [string, string] | 'confirmation'
  defaultValue?: {
    opr: string
    val: string
  }
}

export interface FilterValue {
  field: string
  opr: string | null
  val: string | null
}

export interface ComponentProps {
  modelValue: FilterValue
  label: string
  operators?: AllOperators[]
}

export type RemoveFilterFn = (index: number) => void

export const REMOVE_FILTER = Symbol('removeFilter')

export default function useFilters(filters: Filter[]) {
  const filtersWithDefault = filters.filter(item => item.defaultValue)

  const state = reactive<{
    selectedFilter: Filter[]
    filters: Filter[]
    values: FilterValue[]
  }>({
    selectedFilter: filtersWithDefault,
    filters: filters.filter(item => !item.defaultValue),
    values: filtersWithDefault.map(item => ({ field: item.field, opr: item.defaultValue.opr, val: item.defaultValue.val }))
  })

  const appendFilter = (index: number) => {
    state.selectedFilter.push(filters[index])
    state.values.push({ field: filters[index].field, opr: '', val: null })
    state.filters.splice(index, 1)
  }

  const removeFilter: RemoveFilterFn = (index: number) => {
    state.filters.push(state.selectedFilter[index])
    state.selectedFilter.splice(index, 1)
    state.values.splice(index, 1)
  }

  provide(REMOVE_FILTER, removeFilter)

  const toQueryString = (path?: string) => {
    const query = new URLSearchParams()

    state.values.forEach((filter, index) => {
      // check if operator is initialized or not
      if (!filter.opr) return

      // if the value is empty, then just skip it
      if (typeof filter.val === 'undefined' || filter.val === null) return

      query.append(`filters[${index}][field]`, filter.field)
      query.append(`filters[${index}][opr]`, filter.opr)
      query.append(`filters[${index}][val]`, filter.val)
    })

    if (path) {
      if (path[path.length - 1] != '/') {
        path += '/'
      }

      return `${path}?${query.toString()}`
    }

    return query.toString()
  }

  const toQueryObject = () => {
    const result: { filters: FilterValue[] } = {
      filters: []
    }

    for (const filter of state.values) {
      // check if operator is initialized or not
      if (!filter.opr) continue

      // if the value is empty, then just skip it
      if (typeof filter.val === 'undefined' || filter.val === null) continue

      result.filters.push({
        field: filter.field,
        opr: filter.opr,
        val: filter.val
      })
    }

    return result
  }

  return {
    state,
    appendFilter,
    removeFilter,
    toQueryString,
    toQueryObject
  }
}
