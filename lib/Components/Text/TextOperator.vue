<script setup lang="ts">
import { withEqAndNeq } from '../../utils/helpers'

const items = withEqAndNeq([
  {
    label: 'Contains',
    value: 'contains'
  },
  {
    label: 'Starts With',
    value: 'starts_with'
  },
  {
    label: 'Ends With',
    value: 'ends_with'
  },
  {
    label: 'Not Contains',
    value: 'not_contains'
  }
])
</script>

<template>
  <v-select :items="items" label="Operator" item-title="label" item-value="value"></v-select>
</template>
