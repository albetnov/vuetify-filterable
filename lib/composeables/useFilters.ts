import type { AllOperators } from '../utils/Operators'
import { provide, reactive } from 'vue'

export interface Entry {
  label: string
  key: string
}

export interface Filter {
  label: string
  field: string
  type: 'select' | 'select-multiple' | 'date' | 'date-range' | 'string' | 'number' | 'range'
  entries?: Entry[]
  operators?: AllOperators[]
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
export type RemoveValueFn = (id: string) => void

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

    for (const [index, filter] of Object.entries(state.values)) {
      // if the value|operator is empty, it's mean the filter is not yet initialized or used, that's said we can just skip it.
      if (!filter.val || !filter.opr) continue

      query.append(`filters[${index}][field]`, filter.field)
      query.append(`filters[${index}][operator]`, filter.opr)
      query.append(`filters[${index}][value]`, filter.val)
    }

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
      // if the value|operator is empty, it's mean the filter is not yet initialized or used, that's said we can just skip it.
      if (!filter.val || !filter.opr) continue

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
