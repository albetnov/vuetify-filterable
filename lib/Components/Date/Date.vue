<script setup lang="ts">
import { ref, toRef } from 'vue'
import DateOperator from './DateOperator.vue'
import useFilterField from '../../composeables/useFilterField'

const props = defineProps<{
  modelValue: {
    opr: string
    val: string
  }
  label: string
}>()

const emits = defineEmits<{
  'update:modelValue': [val: unknown]
}>()

const { onOperatorUpdate, onValueUpdate } = useFilterField(emits, toRef(props, 'modelValue'))

const isMenuOpen = ref(false)

const handleOnSave = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <v-col :cols="2">
    <DateOperator :model-value="props.modelValue.opr" @update:model-value="onOperatorUpdate" />
  </v-col>
  <v-col>
    <v-menu :close-on-content-click="false" v-model="isMenuOpen">
      <template #activator="{ props: activatorProps }">
        <v-text-field
          :model-value="props.modelValue.val"
          @update:model-value="onValueUpdate($event)"
          v-bind="activatorProps"
          placeholder="mm/dd/yy"
          :label="props.label"
        ></v-text-field>
      </template>
      <v-input>
        <v-date-picker
          :model-value="props.modelValue.val"
          @update:model-value="onValueUpdate($event)"
          @click:save="handleOnSave"
          format="keyboardDate"
        />
      </v-input>
    </v-menu>
  </v-col>
</template>
