import { Link } from "react-router-dom";
import type { CatalogItem } from "../../../../types/catalog";
import { CatalogCard } from "../CatalogCard";
import "./RecommendedServices.css";

type RecommendedServicesProps = {
    services: CatalogItem[];
};

export function RecommendedServices({ services }: RecommendedServicesProps) {
    return (
        <section className="recommended-section">
            <div className="recommended-section__container">
                <div className="recommended-section__header">
                    <div>
                        <h2 className="recommended-section__title">
                            Recommended for you
                        </h2>
                        <p className="recommended-section__subtitle">
                            Other passengers also booked these services
                        </p>
                    </div>

                    <Link className="recommended-section__link" to="/">
                    View all catalog
                    </Link>
                </div>

                <div className="recommended-section__grid">
                    {services.map((service) => (
                        <CatalogCard item={service} key={service.id} />
                    ))}
                </div>
            </div>
        </section>
    );
}
