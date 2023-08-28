<script setup lang="ts">
import type { ComponentProps } from '../../composeables/useFilters'
import Operator from '../Operator.vue'
import { toRef } from 'vue'
import useOperator from '../../composeables/useOperator'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<ComponentProps>()

const value = toRef(() => props.modelValue)
const operators = useOperator(value, ['eq', 'neq', 'gt', 'lt', 'gte', 'lte'], 'eq', props.operators)
</script>

<template>
  <Operator :items="operators" v-model="value.opr" />
  <v-col>
    <v-slider :label="props.label" v-model="value.val" step="1"></v-slider>
  </v-col>
</template>
