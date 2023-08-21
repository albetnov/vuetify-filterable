<script setup lang="ts">
import { reactive } from 'vue'
import SelectSingle from './Select/SelectSingle.vue'
import type { Filter } from '../composeables/useFilters'
import SelectMulti from './Select/SelectMulti.vue'
import Removeable from './Removeable.vue'
import Text from './Text/Text.vue'
import Number from './Number/Number.vue'
import NumberRange from './Number/NumberRange.vue'
import Date from './Date/Date.vue'
import DateRange from './Date/DateRange.vue'

const props = defineProps<{
  filters: Filter[]
  modelValue: Record<string, any>
}>()

const emits = defineEmits<{
  'update:modelValue': [val: unknown]
  updating: [id: string, val: unknown, opr: string]
}>()

interface OperatorWithValue {
  opr: string
  val: unknown
}

const getVal = (id: string, defaultOperator: string) =>
  reactive({
    opr: props.modelValue[id]?.opr ?? defaultOperator,
    val: props.modelValue[id]?.val
  })

const updVal = (id: string, e: unknown) => {
  emits('update:modelValue', {
    ...props.modelValue,
    [id]: {
      val: (e as OperatorWithValue).val,
      opr: (e as OperatorWithValue).opr
    }
  })
  emits('updating', id, (e as OperatorWithValue).val, (e as OperatorWithValue).opr)
}
</script>

<template>
  <template v-for="(filter, key) in props.filters" :key="filter.uid">
    <v-container>
      <Removeable :index="key" :id="filter.uid" v-if="filter.type === 'select'">
        <SelectSingle
          :label="filter.label"
          :model-value="getVal(filter.uid, 'eq')"
          @update:model-value="updVal(filter.uid, $event)"
          :items="filter.value"
        />
      </Removeable>

      <Removeable :index="key" :id="filter.uid" v-if="filter.type === 'select-multiple'">
        <SelectMulti
          :label="filter.label"
          :model-value="getVal(filter.uid, 'in')"
          @update:model-value="updVal(filter.uid, $event)"
          :items="filter.value"
        />
      </Removeable>

      <Removeable :index="key" :id="filter.uid" v-if="filter.type === 'string'">
        <Text
          :label="filter.label"
          :model-value="getVal(filter.uid, 'contains')"
          @update:model-value="updVal(filter.uid, $event)"
        />
      </Removeable>

      <Removeable :index="key" :id="filter.uid" v-if="filter.type === 'number'">
        <Number
          :label="filter.label"
          :model-value="getVal(filter.uid, 'eq')"
          @update:model-value="updVal(filter.uid, $event)"
        />
      </Removeable>

      <Removeable :index="key" :id="filter.uid" v-if="filter.type === 'range'">
        <NumberRange
          :label="filter.label"
          :model-value="getVal(filter.uid, 'eq')"
          @update:model-value="updVal(filter.uid, $event)"
        />
      </Removeable>

      <Removeable :index="key" :id="filter.uid" v-if="filter.type === 'date'">
        <Date
          :label="filter.label"
          :model-value="getVal(filter.uid, 'gt')"
          @update:model-value="updVal(filter.uid, $event)"
        />
      </Removeable>

      <Removeable :index="key" :id="filter.uid" v-if="filter.type === 'date-range'">
        <DateRange
          :label="filter.label"
          :model-value="getVal(filter.uid, 'in')"
          @update:model-value="updVal(filter.uid, $event)"
        />
      </Removeable>
    </v-container>
  </template>
</template>
