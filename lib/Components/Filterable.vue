<script setup lang="ts">
import { toRef } from 'vue'
import SelectSingle from './Select/SelectSingle.vue'
import type { Filter, FilterValue } from '../composeables/useFilters'
import SelectMulti from './Select/SelectMulti.vue'
import Removeable from './Removeable.vue'
import Text from './Text/Text.vue'
import Number from './Number/Number.vue'
import NumberRange from './Number/NumberRange.vue'
import Date from './Date/Date.vue'
import DateRange from './Date/DateRange.vue'
import Boolean from './Boolean/Index.vue'

const props = defineProps<{
  filters: Filter[]
  modelValue: FilterValue[]
}>()

const state = toRef(() => props.modelValue)

const supportedComponents = {
  select: SelectSingle,
  'select-multiple': SelectMulti,
  string: Text,
  number: Number,
  range: NumberRange,
  date: Date,
  'date-range': DateRange,
  boolean: Boolean
}
</script>

<template>
  <v-container>
    <template v-for="(filter, key) in props.filters" :key="filter.label">
      <Removeable :index="key">
        <slot
          v-if="filter.type === 'custom'"
          :name="`custom.${filter?.customId}`"
          :operator="{
            events: { 'update:model-value': ($event: string) => (state[key].opr = $event) },
            bindings: { value: state[key].opr }
          }"
          :value="{
            events: { 'update:model-value': ($event: string) => (state[key].val = $event) },
            bindings: { value: state[key].val }
          }"
        ></slot>
        <Component
          v-else
          :is="supportedComponents[filter.type]"
          v-bind="{
            label: filter.label,
            operators: filter.operators,
            ...(filter.type === 'select' || filter.type === 'select-multiple'
              ? { items: filter.entries }
              : {}),
            ...(filter.type === 'boolean' ? { itemLabels: filter.itemLabels } : {})
          }"
          v-model="state[key]"
        />
      </Removeable>
    </template>
  </v-container>
</template>
