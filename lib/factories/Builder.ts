import type { Filter } from "../composeables/useFilters";
import FilterTypeFactory from "./FilterTypeFactory";

export default class Builder {
    private filters: Filter[] = []

    public add({field,label, filter} : Pick<Filter, "field" | "label"> & {filter: (builder: FilterTypeFactory) => Filter}) {
        this.filters.push(filter(new FilterTypeFactory(field, label)));
        return this;
    }

    public get() {
        return this.filters;
    }
}