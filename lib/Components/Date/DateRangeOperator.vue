<script setup lang="ts">
const items = [
  {
    label: 'In',
    value: 'in'
  },
  {
    label: 'Not In',
    value: 'nin'
  }
]
</script>

<template>
  <v-select :items="items" label="Operator" item-title="label" item-value="value"></v-select>
</template>
