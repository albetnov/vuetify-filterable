<script setup lang="ts">
import { toRef } from 'vue'
import type { FilterValue } from '../../composeables/useFilters'
import Operator from '../Operator.vue'
import useDisclosure from '../../composeables/useDisclosure'
import useOperator from '../../composeables/useOperator'
import useArrayable from '../../composeables/useArrayable'

const props = defineProps<{
  modelValue: FilterValue
  label: string
}>()

const { handleOnSave, isMenuOpen } = useDisclosure()
const value = toRef(() => props.modelValue)
const fieldValue = useArrayable(value)
const operators = useOperator(value, ['in', 'not_in'], 'in')
</script>

<template>
  <Operator :items="operators" v-model="value.opr" />
  <v-col>
    <v-menu :close-on-content-click="false" v-model="isMenuOpen">
      <template #activator="{ props: activatorProps }">
        <v-text-field
          :value="value.val"
          readonly
          v-bind="activatorProps"
          placeholder="mm/dd/yy"
          :active="value.val !== null"
          :label="props.label"
        ></v-text-field>
      </template>
      <v-input>
        <v-date-picker
          v-model="fieldValue"
          @click:save="handleOnSave"
          format="keyboardDate"
          multiple
        />
      </v-input>
    </v-menu>
  </v-col>
</template>
