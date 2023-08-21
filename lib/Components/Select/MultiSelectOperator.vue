<script setup lang="ts">
import { watchEffect } from 'vue'
import { ref } from 'vue'

const items = [
  {
    label: 'In',
    value: 'in'
  },
  {
    label: 'Not In',
    value: 'not_in'
  },
  {
    label: 'Have All',
    value: 'have_all'
  }
]

const value = ref()

watchEffect(() => console.log(value.value))
</script>

<template>
  <v-select
    :items="items"
    label="Operator"
    item-title="label"
    item-value="value"
    v-model="value"
  ></v-select>
</template>
