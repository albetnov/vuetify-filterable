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
  const state = reactive<{
    selectedFilter: Filter[]
    filters: Filter[]
    values: FilterValue[]
  }>({
    selectedFilter: [],
    filters: filters,
    values: []
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
      query.append(`filters[${index}][operator]`, filter.opr)
      query.append(`filters[${index}][value]`, filter.val)
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
    const result: { filters: { field: string; operator: string; value: string }[] } = {
      filters: []
    }

    for (const filter of state.values) {
      // check if operator is initialized or not
      if (!filter.opr) continue

      // if the value is empty, then just skip it
      if (typeof filter.val === 'undefined' || filter.val === null) continue

      result.filters.push({
        field: filter.field,
        operator: filter.opr,
        value: filter.val
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
