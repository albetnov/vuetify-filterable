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
    <v-text-field :label="props.label" v-model="value.val" type="number"></v-text-field>
  </v-col>
</template>
