import type { CatalogCategory } from "../../../types/catalog";
import "./CategoryFilters.css";

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
  { label: "Meals", value: "MEAL" },
  { label: "Films", value: "FILM" },
  { label: "Newspapers", value: "NEWSPAPER" },
  { label: "Activities", value: "ACTIVITY" },
];

export function CategoryFilters({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div
      className="category-filters"
      aria-label="Catalog categories"
    >
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
