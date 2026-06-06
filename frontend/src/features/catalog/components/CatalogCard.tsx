import { Link } from "react-router-dom";
import type {CatalogCategory, CatalogItem } from "../../../types/catalog";
import { formatPrice } from "../utils/formatPrice";
import "./CatalogCard.css";

type CatalogCardProps = {
    item: CatalogItem;
}

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

                    <Link className="catalog-card__button" to={`/catalog/${item.id}`}>
                        Details
                        <span aria-hidden="true">›</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}