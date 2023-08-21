<script setup lang="ts">
import useFilterField from '../../composeables/useFilterField'
import { toRef } from 'vue'
import NumberOperator from './NumberOperator.vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  modelValue: {
    opr: string
    val: number
  }
}>()

const emits = defineEmits<{
  'update:modelValue': [val: unknown]
}>()

const { onOperatorUpdate, onValueUpdate } = useFilterField(emits, toRef(props, 'modelValue'))
</script>

<template>
  <v-col :cols="2">
    <NumberOperator :model-value="props.modelValue.opr" @update:model-value="onOperatorUpdate" />
  </v-col>
  <v-col>
    <v-slider
      v-bind="$attrs"
      :model-value="props.modelValue.val"
      @update:model-value="onValueUpdate($event)"
      step="1"
    ></v-slider>
  </v-col>
</template>
