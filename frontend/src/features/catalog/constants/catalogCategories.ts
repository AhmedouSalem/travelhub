import type { CatalogCategory } from "../../../types/catalog";

export const catalogCategoryOrder: CatalogCategory[] = [
  "MEAL",
  "FILM",
  "NEWSPAPER",
  "ACTIVITY",
];

export const categoryLabels: Record<CatalogCategory, string> = {
  MEAL: "Meals",
  FILM: "Films",
  NEWSPAPER: "Newspapers",
  ACTIVITY: "Activities",
};

export const categoryIcons: Record<CatalogCategory, string> = {
  MEAL: "🍴",
  FILM: "▣",
  NEWSPAPER: "▤",
  ACTIVITY: "✧",
};