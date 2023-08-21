import type { Ref } from 'vue'

export default function useFilterField(
  emits: (e: 'update:modelValue', val: unknown) => void,
  value: Ref<object>
) {
  const onOperatorUpdate = (e: unknown) => {
    emits('update:modelValue', {
      ...value.value,
      opr: e
    })
  }

  const onValueUpdate = (e: unknown, cast?: 'number' | 'array') => {
    if (cast === 'number') {
      e = Number(e)
    }

    if (cast === 'array') {
      if (!Array.isArray(e) && typeof e === 'string') {
        e = e.split(',')
      }
    }

    emits('update:modelValue', {
      ...value.value,
      val: e
    })
  }

  return {
    onOperatorUpdate,
    onValueUpdate
  }
}
