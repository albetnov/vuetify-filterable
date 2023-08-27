<script setup lang="ts">
import type { Operator as OperatorField } from '../utils/Operators'

const props = defineProps<{
  items: OperatorField[]
}>()

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <v-col :sm="2" :xl="1">
    <v-select
      v-bind="$attrs"
      :items="props.items"
      label="Operator"
      item-title="label"
      item-value="key"
    ></v-select>
  </v-col>
</template>
