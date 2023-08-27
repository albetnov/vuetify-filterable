<script setup lang="ts">
import type { FilterValue } from '../../composeables/useFilters'
import Operator from '../Operator.vue'
import { toRef } from 'vue'
import useOperator from '../../composeables/useOperator'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  modelValue: FilterValue
  label: string
}>()

const value = toRef(() => props.modelValue)

const operators = useOperator(
  value,
  ['eq', 'neq', 'contains', 'not_contains', 'starts_with', 'ends_with'],
  'eq'
)
</script>

<template>
  <Operator :items="operators" v-model="value.opr" />
  <v-col>
    <v-text-field :label="props.label" v-model="value.val"></v-text-field>
  </v-col>
</template>
