<script setup lang="ts">
import type { FilterValue } from '../../composeables/useFilters'
import useNumberModel from './useNumberModel'
import Operator from '../Operator.vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  modelValue: FilterValue
  label: string
}>()

const { value, operators } = useNumberModel(props, 'eq')
</script>

<template>
  <Operator :items="operators" v-model="value.opr" />
  <v-col>
    <v-slider :label="props.label" v-model="value.val" step="1"></v-slider>
  </v-col>
</template>
