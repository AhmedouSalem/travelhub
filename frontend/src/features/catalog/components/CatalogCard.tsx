import type { CatalogCardProps, CatalogCategory } from "../../../types/catalog";
import "./CatalogCard.css";

const categoryLabels: Record<CatalogCategory, string> = {
    MEAL: "Meals",
    FILM: "Films",
    NEWSPAPER: "Newspapers",
    ACTIVITY: "Activities",
};

const categoryIcons: Record<CatalogCategory, string> = {
    MEAL: "🍴",
    FILM: "▣",
    NEWSPAPER: "▤",
    ACTIVITY: "✧",
};

function formatPrice(price: number): string {
    if (price === 0) {
        return "Free";
    }

    return `$${price.toFixed(2)}`;
}

export function CatalogCard({ item } : CatalogCardProps) {
    return (
        <article className="catalog-card">
            <div className="catalog-card__image-container">
                <img
                    className="catalog-card__image"
                    src={item.imageUrl}
                    alt={item.title}
                />
                <span className="catalog-card__category">
                    <span aria-hidden="true">{categoryIcons[item.category]}</span>
                    {categoryLabels[item.category]}
                </span>
            </div>

            <div className="catalog-card__body">
                <h3 className="catalog-card__title">{item.title}</h3>

                <p className="catalog-card__description">{item.description}</p>

                <div className="catalog-card__footer">
                    <div>
                        <p className="catalog-card__price">{formatPrice(item.price)}</p>

                        <p
                            className= {`catalog-card__availability ${
                                item.available
                                    ? "catalog-card__availability--available"
                                    : "catalog-card__availability--sold-out"
                                }`}
                        >
                            {item.available ? "AVAILABLE" : "SOLD OUT"}
                        </p>
                    </div>

                    <button className="catalog-card__button" type="button">
                        Details
                        <span aria-hidden="true">›</span>
                    </button>
                </div>
            </div>
        </article>
    );
}