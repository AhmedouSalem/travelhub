import { Link, useParams } from "react-router-dom";
import type { CatalogItem } from "../../../types/catalog";
import { categoryLabels } from "../constants/catalogCategories";
import { PublicNavbar } from "../../../components/layout/PublicNavbar";
import { PublicFooter } from "../../../components/layout/PublicFooter";
import { ServiceBreadcrumb } from "../components/details/ServiceBreadcrumb";
import { ServiceBookingPanel } from "../components/details/ServiceBookingPanel";
import { RecommendedServices } from "../components/details/RecommendedServices";
import "./ServiceDetailPage.css";
import { useEffect, useState } from "react";
import { catalogApi } from "../../../api/catalogApi";

type ServiceDetailContent = {
  prepTime: string;
  serviceContext: string;
  about: string;
  included: string[];
  dietaryTags: string[];
};

const detailContentById: Record<string, ServiceDetailContent> = {
  "meal-mediterranean": {
    prepTime: "15 mins",
    serviceContext: "In-flight Dining",
    about:
      "Experience the vibrant and fresh flavors of the Mediterranean at 30,000 feet. Our carefully curated menu features a balanced selection of grilled vegetables, lean proteins, and wholesome grains, seasoned with authentic herbs and extra virgin olive oil. Perfect for a satisfying and healthy dining experience during your journey.",
    included: [
      "Grilled herb-marinated chicken breast or Halloumi for vegetarians",
      "Quinoa and roasted vegetable salad with lemon vinaigrette",
      "Fresh tzatziki dip with warm pita bread",
      "Seasonal fresh fruit medley",
      "Choice of complimentary beverage: water, juice, or soft drink",
    ],
    dietaryTags: ["Halal Certified", "Vegetarian Option Available", "Nut-Free"],
  },
};

function getDefaultDetailContent(item: CatalogItem): ServiceDetailContent {
  return {
    prepTime: item.category === "MEAL" ? "15 mins" : "Available on demand",
    serviceContext: categoryLabels[item.category],
    about: item.description,
    included: [
      "Access to the selected TravelHub service",
      "Available during your journey",
      "Support from the passenger service team if needed",
    ],
    dietaryTags:
      item.category === "MEAL" ? ["Information available on request"] : [],
  };
}

export function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [service, setService] = useState<CatalogItem | null>(null);
  const [recommendedServices, setRecommendedServices] = useState<CatalogItem[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setErrorMessage("Missing service identifier");
      setIsLoading(false);
      return;
    }

    let ignore = false;

    async function loadServiceDetail(id: string) {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const [serviceData, catalogData] = await Promise.all([
          catalogApi.getCatalogItem(id),
          catalogApi.getCatalog(),
        ]);

        if (!ignore) {
          setService(serviceData);
          setRecommendedServices(
            catalogData
              .filter((item) => item.id !== serviceData.id)
              .slice(0, 3),
          );
        }
      } catch {
        if (!ignore) {
          setErrorMessage(
            "The service you are looking for could not be loaded.",
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadServiceDetail(id);

    return () => {
      ignore = true;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="public-page">
        <PublicNavbar />

        <main className="service-detail-not-found">
          <h1>Loading service...</h1>
          <p>TravelHub is loading the selected passenger service.</p>
        </main>

        <PublicFooter />
      </div>
    );
  }

  if (errorMessage || !service) {
    return (
      <div className="public-page">
        <PublicNavbar />

        <main className="service-detail-not-found">
          <h1>Service not found</h1>
          <p>{errorMessage ?? "This service does not exist in the catalog."}</p>

          <Link className="service-detail-not-found__link" to="/">
            Back to catalog
          </Link>
        </main>

        <PublicFooter />
      </div>
    );
  }

  const categoryLabel = categoryLabels[service.category];
  const detailContent =
    detailContentById[service.id] ?? getDefaultDetailContent(service);

  // const recommendedServices = mockCatalog
  //   .filter((item) => item.id !== service.id)
  //   .slice(0, 3);

  return (
    <div className="public-page">
      <PublicNavbar />

      <main className="service-detail-page">
        <div className="service-detail-page__container">
          <div className="service-detail-page__main">
            <ServiceBreadcrumb
              categoryLabel={categoryLabel}
              title={service.title}
            />

            <span className="service-detail-page__category">
              {categoryLabel}
            </span>

            <h1 className="service-detail-page__title">{service.title}</h1>

            <div className="service-detail-page__meta">
              <span>◷ Prep time: {detailContent.prepTime}</span>
              <span>🍽 {detailContent.serviceContext}</span>
            </div>

            <img
              className="service-detail-page__image"
              src={service.imageUrl}
              alt={service.title}
            />

            <section className="service-detail-section">
              <h2>About this service</h2>
              <p>{detailContent.about} </p>
            </section>

            <section className="service-included-card">
              <h2>What&apos;s included</h2>

              <ul className="service-included-card__list">
                {detailContent.included.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {detailContent.dietaryTags.length > 0 && (
              <section className="service-dietary-section">
                <h2>♧ Dietary Information</h2>

                <div className="service-dietary-section__tags">
                  {detailContent.dietaryTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </section>
            )}
          </div>

          <ServiceBookingPanel
            available={service.available}
            price={service.price}
          />
        </div>
      </main>

      <RecommendedServices services={recommendedServices} />

      <PublicFooter />
    </div>
  );
}
