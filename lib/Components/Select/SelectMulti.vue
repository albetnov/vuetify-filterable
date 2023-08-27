<script setup lang="ts">
import type { Entry, FilterValue } from '../../composeables/useFilters'
import Operator from '../Operator.vue'
import useArrayable from '../../composeables/useArrayable'
import { toRef } from 'vue'
import useOperator from '../../composeables/useOperator'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  modelValue: FilterValue
  label: string
  items: Entry[]
}>()

const value = toRef(() => props.modelValue)
const fieldValue = useArrayable(value)
const operators = useOperator(value, ['in', 'not_in', 'have_all'], 'in')
</script>

<template>
  <Operator :items="operators" v-model="value.opr" />
  <v-col>
    <v-select
      item-title="label"
      item-value="val"
      :items="props.items"
      :label="props.label"
      multiple
      chips
      v-model="fieldValue"
    ></v-select>
  </v-col>
</template>
