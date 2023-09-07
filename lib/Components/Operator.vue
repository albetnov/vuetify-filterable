<script setup lang="ts">
import { Operators, type AllOperators } from '../utils/Operators'

const props = defineProps<{
  items: AllOperators[]
}>()

const operators = new Operators().pick(props.items)

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <v-col :md="2">
    <v-select
      v-bind="$attrs"
      :items="operators"
      label="Operator"
      item-title="label"
      item-value="key"
    ></v-select>
  </v-col>
</template>
