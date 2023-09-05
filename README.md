# Vuetify Filterable

Vuetify Filterable is a package that renders rich and flexible filters for your application's requirements.

> It's simply a view component.

# Quick Usage

First, install it:

```bash
pnpm i vuetify-filterable
```

Then, plug it in (Basic Installation Example):

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
import { onMounted } from 'vue'

// use Filter[] types to unlock auto complete
const filters: Filter[] = [
    {
        label: "Roles",
        field: "role",
        type: "select" // use the autocomplete to see available types,
        entries: [ // only required if type is `select` or `select-multiple`.
            {label: "Super Admin", key: "super_admin"},
            {label: "User", key: "user"}
        ]
    }
]

const { appendFilter, state } = useFilters(filters)

onMounted(() => {
  appendFilter(0) // index of the filters array.
})
</script>

<template>
  <v-filterable v-model="state.values" :filters="state.selectedFilter" />
</template>
```

> The `entries` key is only required when the type is 'select' or 'select-multiple'.

# The `Filter`

- `type` <br />
  There are multiple types that `filter` support. These are:
  - `select` (requires extra field: `entries`)
  - `select-multiple` (requires extra field: `entries`)
  - `date`
  - `date-range`
  - `string`
  - `number`
  - `range` (a number but range slider)
  - `boolean` (same to `select` but limited to yes and no, requires extra field: `itemLabels`)
- `field` <br />
  The `field` key used to give `meta` information to the backend for which column to filter. This key receive `string`.
- `label` <br />
  placeholder text for the filter component. This key receive `string`.
- `entries` <br />
  This key used to define the data for `select` or `select-multiple` type. This key receive object with `label` and `key` pair.
- `itemLabels` <br />
  Like `entries` but for `boolean` type instead. This key received tuple of two strings or `confirmation`.

## Using `select` or `select-multiple`

To use `select` or `select-multiple` you have to define the entries at the data state.

```typescript
import useFilters from 'vuetify-filterable/composeables/useFilters'

useFilters([
  {
    field: 'membership',
    label: 'Membership',
    type: 'select-multiple',
    // required if type === 'select' or type === 'select-multiple'
    entries: [
      { label: 'Silver', key: 'silver' },
      { label: 'Gold', key: 'gold' }
    ]
  }
])
```

> The same also applies to `select`

## Using `boolean`

To use `boolean` type you have to define the items placeholder for both `true` and `false`:

```typescript
import useFilters from 'vuetify-filterable/composeables/useFilters'

useFilters([
  {
    field: 'is_active',
    label: 'Is Active?',
    type: 'boolean',
    // required if type === 'boolean'
    itemLabels: ['Active', 'Not Active']
  }
])
```

> Note: the first index refer to `true` while the second index refer to `false`.

You can also use a template labels like `['Yes', 'No']` by putting `confirmation` to `itemLabels`:

```typescript
import useFilters from 'vuetify-filterable/composeables/useFilters'

useFilters([
  {
    field: 'is_active',
    label: 'Is Active?',
    type: 'boolean',
    // required if type === 'boolean'
    itemLabels: 'confirmation' // alias to ['Yes', 'No']
  }
])
```

# Server Side Adapter

[Laravel Filterable](https://github.com/albetnov/laravel-filterable) is a simple Server Side Adapter that able to read and process this library generated query string or object automatically.

This includes type casting, queries, and etc.

# API Reference

## `v-filterable` Component

- Props

  - filters <br />
    An array of `Filter[]` to be rendered.
  - v-model <br />
    Represents the filter's value. It contains `array` of `selectedFilter[]` with it's appropriate `value` and `operator`.

## `useFilters` Composable

- Props

  - filters <br />
    An array of `Filter[]` to be managed.

- Return Value

  - appendFilter(i: number) <br />
    Adds a new filter to `state.selectedFilter[]`.

  - removeFilter(i: number) <br />
    Removes a filter from `state.selectedFilter[]`.

  - toQueryString(p?: string) <br />
    Returns a URL with the appended query string if `p` is filled, of `state.values`.
  - toQueryObject() <br />
    Returns a mapped `state.values` that matched the generated query string of `toQueryString`.
