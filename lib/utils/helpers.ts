export function withEqAndNeq(rest?: unknown[]) {
  const eqAndNeq = [
    {
      label: 'Equal',
      value: 'eq'
    },
    {
      label: 'Not Equal',
      value: 'neq'
    }
  ]

  if (rest) {
    return [...rest, ...eqAndNeq]
  }

  return eqAndNeq
}
