<script setup lang="ts">
import { REMOVE_FILTER, type RemoveFilterFn } from '../composeables/useFilters'
import { inject } from 'vue'

const props = defineProps<{
  index: number
}>()

const removeFilter = inject(REMOVE_FILTER) as RemoveFilterFn
</script>

<template>
  <v-row>
    <slot />
    <v-col :cols="3" :sm="1">
      <v-btn
        icon="mdi-close"
        variant="tonal"
        color="error"
        @click="removeFilter(props.index)"
      ></v-btn>
    </v-col>
  </v-row>
</template>
