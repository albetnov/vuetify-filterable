<script setup lang="ts">
import type { FilterValue, Entry } from 'lib/composeables/useFilters'
import Operator from '../Operator.vue'
import useSelectSingleModel from './useSelectSingleModel'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  modelValue: FilterValue
  label: string
  items: Entry[]
}>()

const { value, operators } = useSelectSingleModel(props, 'eq')
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
