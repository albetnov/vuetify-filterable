<script setup lang="ts">
import useFilterField from '../../composeables/useFilterField'
import SingleSelectOperator from './SingleSelectOperator.vue'
import { toRef } from 'vue'

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
  <v-col :sm="2" :xl="1">
    <SingleSelectOperator
      :model-value="props.modelValue.opr"
      @update:model-value="onOperatorUpdate"
    />
  </v-col>
  <v-col>
    <v-select
      v-bind="$attrs"
      :model-value="props.modelValue.val"
      @update:model-value="onValueUpdate"
      item-title="label"
      item-value="val"
    ></v-select>
  </v-col>
</template>
