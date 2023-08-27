<script setup lang="ts">
import type { FilterValue } from 'lib/composeables/useFilters'
import useTextModel from './useTextModel'
import Operator from '../Operator.vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  modelValue: FilterValue
  label: string
}>()

const { operators, value } = useTextModel(props, 'contains')
</script>

<template>
  <Operator :items="operators" v-model="value.opr" />
  <v-col>
    <v-text-field :label="props.label" v-model="value.val"></v-text-field>
  </v-col>
</template>
