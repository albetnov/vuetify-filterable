<script setup lang="ts">
import type { FilterValue, Entry } from '../../composeables/useFilters'
import Operator from '../Operator.vue'
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
const operators = useOperator(value, ['eq', 'neq'], 'eq')
</script>

<template>
  <Operator :items="operators" v-model="value.opr" />
  <v-col>
    <v-select
      v-model="value.val"
      :label="props.label"
      :items="props.items"
      item-title="label"
      item-value="val"
    ></v-select>
  </v-col>
</template>
