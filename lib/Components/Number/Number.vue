<script setup lang="ts">
import type { FilterValue } from '../../composeables/useFilters'
import Operator from '../Operator.vue'
import useOperator from '../../composeables/useOperator'
import { toRef } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  modelValue: FilterValue
  label: string
}>()

const value = toRef(() => props.modelValue)
const operators = useOperator(value, ['eq', 'neq', 'gt', 'lt', 'gte', 'lte'], 'eq')
</script>

<template>
  <Operator :items="operators" v-model="value.opr" />
  <v-col>
    <v-text-field :label="props.label" v-model="value.val" type="number"></v-text-field>
  </v-col>
</template>
