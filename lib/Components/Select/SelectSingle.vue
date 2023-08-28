<script setup lang="ts">
import type { ComponentProps, Entry } from '../../composeables/useFilters'
import Operator from '../Operator.vue'
import { toRef } from 'vue'
import useOperator from '../../composeables/useOperator'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<ComponentProps & { items: Entry[] }>()

const value = toRef(() => props.modelValue)
const operatorsList = useOperator(value, ['eq', 'neq'], 'eq', props.operators)
</script>

<template>
  <Operator :items="operatorsList" v-model="value.opr" />
  <v-col>
    <v-select
      v-model="value.val"
      :label="props.label"
      :items="props.items"
      item-title="label"
      item-value="key"
    ></v-select>
  </v-col>
</template>
