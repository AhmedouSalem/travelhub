import type { CatalogCategory } from "../../../types/catalog";
import "./CategoryFilters.css";
import {
  catalogCategoryOrder,
  categoryLabels,
} from "../constants/catalogCategories";

export type CategoryFilter = "ALL" | CatalogCategory;

type FilterOption = {
  label: string;
  value: CategoryFilter;
};

type CategoryFilterProps = {
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
};

const filterOptions: FilterOption[] = [
  { label: "All", value: "ALL" },
  ...catalogCategoryOrder.map((category) => ({
    label: categoryLabels[category],
    value: category,
  })),
];

export function CategoryFilters({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="category-filters" aria-label="Catalog categories">
      {filterOptions.map((filter) => (
        <button
          aria-pressed={filter.value === activeCategory}
          className={`category-filter ${
            filter.value === activeCategory ? "category-filter--active" : ""
          }`}
          key={filter.value}
          onClick={() => onCategoryChange(filter.value)}
          type="button"
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
