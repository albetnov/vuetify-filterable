import type { Entry, Filter } from "../composeables/useFilters";

export default class FilterTypeFactory {
    private filter: Partial<Filter>;

    constructor(field: string, label: string) {
        this.filter = {
            field,
            label,
        }
    }

    public confirmation(options?: {itemLabels?: [string, string]}) {
        this.filter.type = "boolean";
        this.filter.itemLabels = options?.itemLabels ?? "confirmation";
        return this.filter as Filter;
    }

    public date(options?: {isRange?: boolean}) {
        this.filter.type = options?.isRange ? "date-range" : "date";
        return this.filter as Filter;
    }

    public choice({items, isMultiple}: {items: Entry[], isMultiple?: boolean}) {
        this.filter.type = isMultiple ? "select-multiple" : "select";
        this.filter.entries = items
        return this.filter as Filter;
    }

    public text(options?: {numberOnly?: boolean}) {
        this.filter.type = options?.numberOnly ? "number" : "string";
        return this.filter as Filter;
    }

    public range() {
        this.filter.type = "range";
        return this.filter as Filter;
    }
}