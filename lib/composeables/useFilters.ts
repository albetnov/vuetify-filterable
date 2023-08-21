import { provide, reactive } from 'vue'

export interface Filter {
  label: string
  uid: string
  value?: { label: string; val: unknown }[]
  type: 'select' | 'select-multiple' | 'date' | 'date-range' | 'string' | 'number' | 'range'
}

export type RemoveFilterFn = (index: number) => void
export type RemoveValueFn = (id: string) => void

export const REMOVE_FILTER = Symbol('removeFilter')
export const REMOVE_VALUE = Symbol('removeValue')

export default function useFilters(filters: Filter[]) {
  const state = reactive<{
    selectedFilter: Filter[]
    filters: Filter[]
    values: Record<string, any>
  }>({
    selectedFilter: [],
    filters: filters,
    values: {}
  })

  const appendFilter = (index: number) => {
    state.selectedFilter.push(filters[index])
    state.filters.splice(index, 1)
  }

  const removeFilter: RemoveFilterFn = (index: number) => {
    state.filters.push(state.selectedFilter[index])
    state.selectedFilter.splice(index, 1)
  }

  const removeValue: RemoveValueFn = (id: string) => {
    if (id in state.values) {
      delete state.values[id]
    }
  }

  provide(REMOVE_FILTER, removeFilter)
  provide(REMOVE_VALUE, removeValue)

  const toQueryString = (path: string) => {
    const query = new URLSearchParams()

    for (const [key, value] of Object.entries(state.values)) {
      query.append(`filter[operator][${key}]`, value.opr)
      query.append(`filter[value][${key}]`, value.val)
    }

    if (path[path.length - 1] != '/') {
      path += '/'
    }

    return `${path}?${query.toString()}`
  }

  return {
    state,
    appendFilter,
    removeFilter,
    removeValue,
    toQueryString
  }
}
