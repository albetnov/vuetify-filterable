# Vuetify Filterable

Vuetify Filterable is a package that renders rich and flexible filters for your application's requirements.

> It's simply a view component.

# Quick Usage

First, install it:

```bash
pnpm i vuetify-filterable
```

Then, plug it in:

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import VuetifyFilterable from 'vuetify-filterable'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components: {
    ...components,
    VDatePicker
  },
  directives
})

createApp(App).use(vuetify).use(VuetifyFilterable).mount('#app')
```

Call it on your template:

```vue
<script setup lang="ts">
import useFilters, { type Filter } from 'vuetify-filterable/composeables/useFilters'

// use Filter[] types to unlock auto complete
const filters: Filter[] = [
    {
        label: "Text Label",
        uid: "unique_id_for_identify_filter",
        type: "select" // use the autocomplete to see available types,
        value: [
            {label: "Another Label for select", value: "value_for_select"}
        ]
    }
]

const { appendFilter, state } = useFilters(filters)
appendFilter(0) // index of the filters array.
</script>

<template>
  <v-filterable v-model="state.values" :filters="state.selectedFilter" />
</template>
```

> The `value` key is only required when the type is 'select' or 'select-multiple'.

# API Reference

## `v-filterable` Component

- Props

  - filters <br />
    An array of `Filter[]` to be rendered.
  - modelValue <br />
    Represents the filter's value. It contains `filter.uid` as keys and an object with `opr` and `val` as the value.

- Events
  - update:modelValue($event) <br />
    Triggered when a value is being updated. It emits a new object with updated values.
  - updating(id, val, opr) <br />
    Triggered when a value is being updated. Unlike the previous event, this one only emits a single updated value rather than an object with updated values.

## `useFilters` Composable

- Props

  - filters <br />
    An array of `Filter[]` to be managed.

- Return Value

  - appendFilter(i: number) <br />
    Adds a new filter to `state.selectedFilter[]`.

  - removeFilter(i: number) <br />
    Removes a filter from `state.selectedFilter[]`.

  - removeValue(k: string) <br />
    Removes filter values from `state.values`.

  - toQueryString(p: string) <br />
    Returns a URL with the appended query string of `state.values` to the provided parameter `p`.
