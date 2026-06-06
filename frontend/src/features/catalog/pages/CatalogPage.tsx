import { PublicFooter } from "../../../components/layout/PublicFooter";
import { PublicNavbar } from "../../../components/layout/PublicNavbar";
import { CatalogCard } from "../components/CatalogCard";
import {
  CategoryFilters,
  type CategoryFilter,
} from "../components/CategoryFilters";
import { HeroSection } from "../components/HeroSection";
import { mockCatalog } from "../data/mockCatalog";
import "../catalog.css";
import { useMemo, useState } from "react";

export function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("ALL");

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredCatalog = useMemo(() => {
    return mockCatalog.filter((item) => {
      const matchesCategory =
        activeCategory === "ALL" || item.category === activeCategory;

      const searchableContent =
        `${item.title} ${item.description}`.toLowerCase();

      const matchesSearch =
        normalizedSearchQuery.length === 0 ||
        searchableContent.includes(normalizedSearchQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, normalizedSearchQuery]);

  const resetFilters = () => {
    setSearchQuery("");
    setActiveCategory("ALL");
  };

  return (
    <div className="public-page">
      <PublicNavbar />

      <main className="catalog-page">
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <section className="catalog-section" aria-labelledby="catalog-title">
          <div className="catalog-section__header">
            <div>
              <h2 className="catalog-section__title" id="catalog-title">
                Our Catalog
              </h2>

              <p className="catalog-section__results">
                {filteredCatalog.length}{" "}
                {filteredCatalog.length > 1 ? "services" : "service"} found
              </p>
            </div>

            <CategoryFilters
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* <div className="catalog-grid">
            {mockCatalog.map((item) => (
              <CatalogCard item={item} key={item.id} />
            ))}
          </div> */}

          {filteredCatalog.length > 0 ? (
            <div className="catalog-grid">
              {filteredCatalog.map((item) => (
                <CatalogCard item={item} key={item.id} />
              ))}
            </div>
          ) : (
            <div className="catalog-empty-state">
              <p className="catalog-empty-state__title">No service found</p>

              <p className="catalog-empty-state__description">
                Try another keyword or select another category to explore the
                catalog.
              </p>

              <button
                className="catalog-empty-state__button"
                onClick={resetFilters}
                type="button"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
