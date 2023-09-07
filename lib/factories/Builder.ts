import type { Entry, Filter } from '../composeables/useFilters'

type EqNeq = 'eq' | 'neq'
type EqNeqGtLt = EqNeq | 'gt' | 'gte' | 'lt' | 'lte'
type InNotIn = 'in' | 'not_in'

export default class Builder {
  private filters: Filter[] = []

  confirmation(
    field: string,
    label: string,
    props?: {
      allowedOperators?: EqNeq[]
      labels?: [string, string]
    }
  ) {
    this.filters.push({
      field,
      label,
      type: 'boolean',
      itemLabels: props?.labels ?? 'confirmation',
      operators: props?.allowedOperators
    })

    return this
  }

  date<T extends boolean>(
    field: string,
    label: string,
    props?: {
      allowedOperators?: (T extends true ? InNotIn : EqNeqGtLt)[]
      isRange?: T
    }
  ) {
    this.filters.push({
      field,
      label,
      type: props?.isRange ? 'date-range' : 'date',
      operators: props?.allowedOperators
    })

    return this
  }

  choice<T extends boolean>(
    field: string,
    label: string,
    items: Entry[],
    props?: {
      allowedOperators?: (T extends true ? InNotIn | 'have_all' : EqNeq)[]
      isMultiple?: T
    }
  ) {
    this.filters.push({
      field,
      label,
      type: props?.isMultiple ? 'select-multiple' : 'select',
      entries: items,
      operators: props?.allowedOperators
    })

    return this
  }

  text<T extends boolean>(
    field: string,
    label: string,
    props?: {
      allowedOperators?: (T extends true
        ? EqNeq | 'contains' | 'not_contains' | 'starts_with' | 'ends_with'
        : EqNeqGtLt)[]
      numberOnly?: T
    }
  ) {
    this.filters.push({
      field,
      label,
      type: props?.numberOnly ? 'number' : 'string',
      operators: props?.allowedOperators
    })

    return this
  }

  range(field: string, label: string, props?: { allowedOperators?: EqNeqGtLt[] }) {
    this.filters.push({
      type: 'range',
      field,
      label,
      operators: props?.allowedOperators
    })

    return this
  }

  custom(field: string, label: string, id: string) {
    this.filters.push({
      type: 'custom',
      field,
      label,
      customId: id
    })

    return this
  }

  get() {
    return this.filters
  }
}
