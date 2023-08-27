<script setup lang="ts">
import type { Entry, FilterValue } from 'lib/composeables/useFilters'
import Operator from '../Operator.vue'
import useSelectMultiModel from './useSelectMultiModel'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  modelValue: FilterValue
  label: string
  items: Entry[]
}>()

const { value, operators, fieldValue } = useSelectMultiModel(props, 'in')
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
