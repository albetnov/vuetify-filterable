<script setup lang="ts">
import useDateRangeModel from './useDateRangeModel'
import type { FilterValue } from '../../composeables/useFilters'
import Operator from '../Operator.vue'

const props = defineProps<{
  modelValue: FilterValue
  label: string
}>()

const { handleOnSave, isMenuOpen, operators, value } = useDateRangeModel(props, 'in')
</script>

<template>
  <Operator :items="operators" v-model="value.opr" />
  <v-col>
    <v-menu :close-on-content-click="false" v-model="isMenuOpen">
      <template #activator="{ props: activatorProps }">
        <v-text-field
          v-model="value.val"
          v-bind="activatorProps"
          placeholder="mm/dd/yy"
          :label="props.label"
        ></v-text-field>
      </template>
      <v-input>
        <v-date-picker
          v-model="value.val"
          @click:save="handleOnSave"
          format="keyboardDate"
          multiple
        />
      </v-input>
    </v-menu>
  </v-col>
</template>
