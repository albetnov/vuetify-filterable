<script setup lang="ts">
import useFilterField from '../../composeables/useFilterField'
import MultiSelectOperator from './MultiSelectOperator.vue'
import { toRef } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  modelValue: {
    opr: string
    val: string[]
  }
}>()

const emits = defineEmits<{
  'update:modelValue': [val: unknown]
}>()

const { onOperatorUpdate, onValueUpdate } = useFilterField(emits, toRef(props, 'modelValue'))
</script>

<template>
  <v-col :sm="2" :xl="1">
    <MultiSelectOperator
      :model-value="props.modelValue.opr"
      @update:model-value="onOperatorUpdate"
    />
  </v-col>
  <v-col>
    <v-select
      v-bind="$attrs"
      item-title="label"
      item-value="val"
      multiple
      chips
      :model-value="props.modelValue.val"
      @update:model-value="onValueUpdate"
    ></v-select>
  </v-col>
</template>
