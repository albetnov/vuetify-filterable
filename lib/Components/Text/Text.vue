<script setup lang="ts">
import useFilterField from '../../composeables/useFilterField'
import { toRef } from 'vue'
import TextOperator from './TextOperator.vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  modelValue: {
    opr: string
    val: string
  }
}>()

const emits = defineEmits<{
  'update:modelValue': [val: unknown]
}>()

const { onOperatorUpdate, onValueUpdate } = useFilterField(emits, toRef(props, 'modelValue'))
</script>

<template>
  <v-col :cols="2">
    <TextOperator :model-value="props.modelValue.opr" @update:model-value="onOperatorUpdate" />
  </v-col>
  <v-col>
    <v-text-field
      v-bind="$attrs"
      :model-value="props.modelValue.val"
      @update:model-value="onValueUpdate"
    ></v-text-field>
  </v-col>
</template>
