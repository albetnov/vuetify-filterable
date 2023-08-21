<script setup lang="ts">
import { withEqAndNeq } from '../../utils/helpers'

const items = withEqAndNeq()
</script>

<template>
  <v-select :items="items" label="Operator" item-title="label" item-value="value"></v-select>
</template>
