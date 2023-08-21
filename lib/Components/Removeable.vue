<script setup lang="ts">
import {
  REMOVE_FILTER,
  REMOVE_VALUE,
  type RemoveFilterFn,
  type RemoveValueFn
} from '../composeables/useFilters'
import { inject } from 'vue'

const props = defineProps<{
  index: number
  id: string
}>()

const removeFilter = inject(REMOVE_FILTER) as RemoveFilterFn
const removeValue = inject(REMOVE_VALUE) as RemoveValueFn

const removeNode = () => {
  removeFilter(props.index)
  removeValue(props.id)
}
</script>

<template>
  <v-row>
    <slot />
    <v-col :cols="3" :sm="1">
      <v-btn icon="mdi-close" variant="tonal" color="error" @click="removeNode"></v-btn>
    </v-col>
  </v-row>
</template>
