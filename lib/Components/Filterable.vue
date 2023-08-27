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

const props = defineProps<{
  filters: Filter[]
  modelValue: FilterValue[]
}>()

const state = toRef(() => props.modelValue)
</script>

<template>
  <template v-for="(filter, key) in props.filters" :key="filter.label">
    <v-container>
      <Removeable :index="key" v-if="filter.type === 'select' && filter.entries">
        <SelectSingle :label="filter.label" v-model="state[key]" :items="filter.entries" />
      </Removeable>

      <Removeable :index="key" v-if="filter.type === 'select-multiple' && filter.entries">
        <SelectMulti :label="filter.label" v-model="state[key]" :items="filter.entries" />
      </Removeable>

      <Removeable :index="key" v-if="filter.type === 'string'">
        <Text :label="filter.label" v-model="state[key]" />
      </Removeable>

      <Removeable :index="key" v-if="filter.type === 'number'">
        <Number :label="filter.label" v-model="state[key]" />
      </Removeable>

      <Removeable :index="key" v-if="filter.type === 'range'">
        <NumberRange :label="filter.label" v-model="state[key]" />
      </Removeable>

      <Removeable :index="key" v-if="filter.type === 'date'">
        <Date :label="filter.label" v-model="state[key]" />
      </Removeable>

      <Removeable :index="key" v-if="filter.type === 'date-range'">
        <DateRange :label="filter.label" v-model="state[key]" />
      </Removeable>
    </v-container>
  </template>
</template>
