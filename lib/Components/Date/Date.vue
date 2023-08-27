<script setup lang="ts">
import Operator from '../Operator.vue'
import type { FilterValue } from '../../composeables/useFilters'
import useDisclosure from '../../composeables/useDisclosure'
import useOperator from '../../composeables/useOperator'
import { toRef } from 'vue'

const props = defineProps<{
  modelValue: FilterValue
  label: string
}>()

const { handleOnSave, isMenuOpen } = useDisclosure()
const value = toRef(() => props.modelValue)
const operators = useOperator(value, ['eq', 'neq', 'gt', 'gte', 'lt', 'lte'], 'eq')
</script>

<template>
  <Operator :items="operators" v-model="value.opr" />
  <v-col>
    <v-menu :close-on-content-click="false" v-model="isMenuOpen">
      <template #activator="{ props: activatorProps }">
        <v-text-field
          :value="value.val"
          :active="value.val !== null"
          v-bind="activatorProps"
          placeholder="mm/dd/yy"
          :label="props.label"
        ></v-text-field>
      </template>
      <v-input>
        <v-date-picker v-model="value.val" @click:save="handleOnSave" format="keyboardDate" />
      </v-input>
    </v-menu>
  </v-col>
</template>
