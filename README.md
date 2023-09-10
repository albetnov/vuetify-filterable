# Vuetify Filterable

Vuetify Filterable is a package that renders rich and flexible filters for your application's requirements.

> It's simply a view component.

# Installation

Install the package from npmjs:

```bash
npm i vuetify-filterable
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

When implementing this, both `v-filterable` and `v-filterable-operator` will be injected. If you wish to modify their prefixes, you can easily do so by passing an `alias`:

```typescript
use(VuetifyFilterable, {
  alias: 'filters'
})
```

The above action will substitute the components with `filters` and `filters-operator`.

# Quick Usage

To utilize the library, you need to import `useFilters` and use it to supply the necessary props for rendering `v-filterable`. An example is provided below:

```vue
<script setup lang="ts">
import useFilters, { type Filter } from 'vuetify-filterable/composeables/useFilters'
import { onMounted } from 'vue'

// use Filter[] types to have auto complete
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

## Using Builder

If the syntax mentioned above causes confusion regarding when to use `entries` and other keys, Vuetify Filterable also offers a Builder Factory that can effortlessly resolve this issue. Let's see it in action:

```typescript
import useFilters from 'vuetify-filterable/composeables/useFilters'
import Builder from 'vuetify-filterable/factories/Builder'

const filters = new Builder()
  .text('name', 'Filter By Name', {
    allowedOperators: ['starts_with', 'ends_with']
  })
  .get()

useFilters(filters) // this also possible
```

### Builder API Reference

[Builder API Reference](https://github.com/albetnov/vuetify-filterable/wiki/Builder-API-Reference)

## Using Object

You can also use object to be passed to `useFilters` like the following example:

```typescript
const filters = [
  {
    field: 'name',
    label: 'Filter By Name',
    type: 'text',
    operators: ['starts_with', 'ends_with']
  }
]

useFilters(filters)
```

> Note: It is highly recommended to use the `Builder` as it provides an abstraction for constructing `objects` with improved readability and enhanced IntelliSense support

### Filter API Reference

[Filter API Reference](https://github.com/albetnov/vuetify-filterable/wiki/Filter-API-Reference)

# Extend it!

Vuetify Filterable supports custom types. Just use `custom` for builder or `type:'custom'` for object (note: you will require to fill `customId` property too).

- Builder Example

```typescript
new Builder().custom('flight_no', 'Flight No', 'someId').get()
```

- Object Example

```typescript
{
  type: "custom",
  field: "flight_no",
  label: "Flight No",
  customId: "someId"
}
```

After that, you can use named slot with prefix of `custom.${string:customId}` to register your own view:

```vue
<template #[`custom.flight_no`]="{ operator, value, label }">
  <!-- Vuetify Filterable Operator -->
  <v-filterable-operator
    v-bind="operator.bindings"
    v-on="operator.events"
    :items="['starts_with', 'eq']"
  ></v-filterable-operator>
  <!-- To align with the view, you should wrap your component using v-col. -->
  <v-col>
    <!-- Your component, should registered both event and bind, there's also a label -->
    <v-text-field :label="label" v-bind="value.bindings" v-on="value.events"></v-text-field>
  </v-col>
</template>
```

# Using `toQueryString` or `toQueryObject`

The `useFilters` composeable supports to convert the current filter state to the query `string` or `object`.

Usage Example:

```typescript
import useFilters from 'vuetify-filterable/composeables/useFilters'

const { toQueryString, toQueryObject } = useFilters(filters)

toQueryString('http://localhost:3000') // generates http://localhost:3000?filters[0][field]=flight_no&filters[0][opr]=eq&filters[0][val]=1010

toQueryObject() // generates {filters:[{field: "flight_no", opr: "eq", val: 1010}]}
```

# Server Side Adapter

[Laravel Filterable](https://github.com/albetnov/laravel-filterable) is a simple Server Side Adapter that able to read and process this library generated query string or object automatically.

This includes type casting, queries, and etc.

> The adapter fully supports `toQueryString`.

# API References

- [`v-filterable`](https://github.com/albetnov/vuetify-filterable/wiki/V%E2%80%90Filterable-Component-API)
- [`v-filterable-operator`](https://github.com/albetnov/vuetify-filterable/wiki/V%E2%80%90Filterable%E2%80%90Operator-Componet-API)
- [`useFilters`](https://github.com/albetnov/vuetify-filterable/wiki/useFilters-API)
- [`Builder`](https://github.com/albetnov/vuetify-filterable/wiki/Builder-API-Reference)
- [`Filter Interface`](https://github.com/albetnov/vuetify-filterable/wiki/Filter-API-Reference)
