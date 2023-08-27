export function withEqAndNeq(rest?: { label: string; value: string }[]) {
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
