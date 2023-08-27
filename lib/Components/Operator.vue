<script setup lang="ts">
const props = defineProps<{
  items: { label: string; value: string }[]
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
      item-value="value"
    ></v-select>
  </v-col>
</template>
