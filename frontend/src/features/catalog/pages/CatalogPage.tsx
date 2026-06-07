import { catalogApi } from "../../../api/catalogApi";
import { PublicFooter } from "../../../components/layout/PublicFooter";
import { PublicNavbar } from "../../../components/layout/PublicNavbar";
import type { CatalogItem } from "../../../types/catalog";
import { CatalogCard } from "../components/CatalogCard";
import {
  CategoryFilters,
  type CategoryFilter,
} from "../components/CategoryFilters";
import { HeroSection } from "../components/HeroSection";
import "./catalog.css";
import { useEffect, useState } from "react";

export function CatalogPage() {
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("ALL");

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadCatalog() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const data = await catalogApi.getCatalog({
          category: activeCategory === "ALL" ? undefined : activeCategory,
          search: searchQuery.trim() || undefined,
        });

        if (!ignore) {
          setCatalog(data);
        }
      } catch {
        if (!ignore) {
          setErrorMessage(
            "Unable to load the catalog. Please try again later.",
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadCatalog();

    return () => {
      ignore = true;
    };
  }, [activeCategory, searchQuery, reloadKey]);

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

              {!isLoading && !errorMessage && (
                <p className="catalog-section__results">
                  {catalog.length} {catalog.length > 1 ? "services" : "service"}{" "}
                  found
                </p>
              )}
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

          {isLoading && (
            <div className="catalog-status-card">
              <p className="catalog-status-card__title">Loading catalog...</p>
              <p className="catalog-status-card__description">
                TravelHub is loading the available passenger services.
              </p>
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="catalog-status-card catalog-status-card-error">
              <p className="catalog-status-card__title">Catalog unavailable</p>
              <p className="catalog-status-card__description">{errorMessage}</p>

              <button
                className="catalog-status-card__button"
                onClick={() => setReloadKey((current) => current + 1)}
                type="button"
              >
                Try again
              </button>
            </div>
          )}

          {!isLoading && !errorMessage && catalog.length > 0 && (
            <div className="catalog-grid">
              {catalog.map((item) => (
                <CatalogCard item={item} key={item.id} />
              ))}
            </div>
          )}

          {!isLoading && !errorMessage && catalog.length === 0 && (
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
