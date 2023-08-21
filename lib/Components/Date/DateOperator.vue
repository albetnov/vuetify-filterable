<script setup lang="ts">
import { withEqAndNeq } from '../../utils/helpers'

const items = withEqAndNeq([
  {
    label: 'Greater Than',
    value: 'gt'
  },
  {
    label: 'Less Than',
    value: 'lt'
  },
  {
    label: 'Greater Than or Equal',
    value: 'gte'
  },
  {
    label: 'Less Than or Equal',
    value: 'lte'
  }
])
</script>

<template>
  <v-select :items="items" label="Operator" item-title="label" item-value="value"></v-select>
</template>
