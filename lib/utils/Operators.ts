export interface Operator {
  label: string
  key: string
}

const operators = [
  'eq',
  'neq',
  'lt',
  'lte',
  'gt',
  'gte',
  'in',
  'not_in',
  'have_all',
  'starts_with',
  'ends_with',
  'contains',
  'not_contains'
] as const

export type AllOperators = (typeof operators)[number]

export type OperatorKeys<T> = Extract<AllOperators, T>

export class Operators {
  private labels = {
    eq: 'Equal',
    neq: 'Not Equal',
    lt: 'Less Than',
    lte: 'Less Than or Equal',
    gt: 'Greater Than',
    gte: 'Greater Than or Equal',
    in: 'In',
    not_in: 'Not In',
    have_all: 'Have All',
    starts_with: 'Starts With',
    ends_with: 'Ends With',
    contains: 'Contains',
    not_contains: 'Not Contains'
  } as const

  pick(rest: AllOperators[]): Operator[] {
    return rest.map((item: AllOperators) => ({
      label: this.labels[item],
      key: item
    }))
  }
}
