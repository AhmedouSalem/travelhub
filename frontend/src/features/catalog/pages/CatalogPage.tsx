import { CatalogCard } from "../components/CatalogCard";
import { mockCatalog } from "../data/mockCatalog";
import "../catalog.css";

export function CatalogPage() {
  return (
    <main className="catalog-page">
      <section className="catalog-section" aria-labelledby="catalog-title">
        <div className="catalog-section__header">
          <h2 className="catalog-section__title" id="catalog-title">
            Our Catalog
          </h2>
        </div>

        <div className="catalog-grid">
          {mockCatalog.map((item) => (
            <CatalogCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
