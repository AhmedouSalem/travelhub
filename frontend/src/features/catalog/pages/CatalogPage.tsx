import { PublicFooter } from "../../../components/layout/PublicFooter";
import { PublicNavbar } from "../../../components/layout/PublicNavbar";
import { CatalogCard } from "../components/CatalogCard";
import { CategoryFilters } from "../components/CategoryFilters";
import { HeroSection } from "../components/HeroSection";
import { mockCatalog } from "../data/mockCatalog";
import "../catalog.css";

export function CatalogPage() {
  return (
    <div className="public-page">
      <PublicNavbar />

      <main className="catalog-page">
        <HeroSection />

        <section className="catalog-section" aria-labelledby="catalog-title">
          <div className="catalog-section__header">
            <h2 className="catalog-section__title" id="catalog-title">
              Our Catalog
            </h2>

            <CategoryFilters />
          </div>

          <div className="catalog-grid">
            {mockCatalog.map((item) => (
              <CatalogCard item={item} key={item.id} />
            ))}
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}