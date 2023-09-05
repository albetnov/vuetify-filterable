<script setup lang="ts">
import { computed, toRef } from 'vue'
import Operator from '../Operator.vue'
import useOperator from '../../composeables/useOperator'
import { type ComponentProps } from '../../composeables/useFilters'

const props = defineProps<
  ComponentProps & {
    itemLabels: [string, string] | 'confirmation'
  }
>()

const items = computed(() => {
  if (props.itemLabels === 'confirmation') {
    return [
      { key: true, label: 'Yes' },
      { key: false, label: 'No' }
    ]
  }

  return [
    { key: true, label: props.itemLabels[0] },
    { key: false, label: props.itemLabels[1] }
  ]
})

const value = toRef(() => props.modelValue)
const operators = useOperator(value, ['eq', 'neq'], 'eq', props.operators)
</script>

<template>
  <Operator :items="operators" v-model="value.opr" />
  <v-col>
    <v-select
      :items="items"
      v-model="value.val"
      :label="props.label"
      item-title="label"
      item-value="key"
    />
  </v-col>
</template>
