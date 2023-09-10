import type { AllOperators } from 'lib/utils/Operators'
import type { DefaultValue, Entry, Filter } from '../composeables/useFilters'

type EqNeq = 'eq' | 'neq'
type EqNeqGtLt = EqNeq | 'gt' | 'gte' | 'lt' | 'lte'
type InNotIn = 'in' | 'not_in'

interface BuilderProps<T extends AllOperators> {
  allowedOperators?: T[]
  defaultValue?: DefaultValue<T>
}

export default class Builder {
  private filters: Filter[] = []

  confirmation(
    field: string,
    label: string,
    props?: BuilderProps<EqNeq> & {
      labels?: [string, string]
    }
  ) {
    this.filters.push({
      field,
      label,
      type: 'boolean',
      itemLabels: props?.labels ?? 'confirmation',
      operators: props?.allowedOperators,
      defaultValue: props?.defaultValue
    })

    return this
  }

  date<T extends boolean>(
    field: string,
    label: string,
    props?: BuilderProps<T extends true ? InNotIn : EqNeqGtLt> & {
      isRange?: T
    }
  ) {
    this.filters.push({
      field,
      label,
      type: props?.isRange ? 'date-range' : 'date',
      operators: props?.allowedOperators,
      defaultValue: props?.defaultValue
    })

    return this
  }

  choice<T extends boolean>(
    field: string,
    label: string,
    items: Entry[],
    props?: BuilderProps<T extends true ? InNotIn | 'have_all' : EqNeq> & {
      isMultiple?: T
    }
  ) {
    this.filters.push({
      field,
      label,
      type: props?.isMultiple ? 'select-multiple' : 'select',
      entries: items,
      operators: props?.allowedOperators,
      defaultValue: props?.defaultValue
    })

    return this
  }

  text<T extends boolean>(
    field: string,
    label: string,
    props?: BuilderProps<
      T extends true ? EqNeq | 'contains' | 'not_contains' | 'starts_with' | 'ends_with' : EqNeqGtLt
    > & {
      numberOnly?: T
    }
  ) {
    this.filters.push({
      field,
      label,
      type: props?.numberOnly ? 'number' : 'string',
      operators: props?.allowedOperators,
      defaultValue: props?.defaultValue
    })

    return this
  }

  range(field: string, label: string, props?: BuilderProps<EqNeqGtLt>) {
    this.filters.push({
      type: 'range',
      field,
      label,
      operators: props?.allowedOperators,
      defaultValue: props?.defaultValue
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
