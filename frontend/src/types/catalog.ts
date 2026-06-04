export type CatalogCategory = "FILM" | "NEWSPAPER" | "MEAL" | "ACTIVITY";

export type CatalogItem = {
    id: string;
    title: string;
    description: string;
    category: CatalogCategory;
    price: number;
    available: boolean;
    imageUrl: string;
};

export type CatalogCardProps = {
    item: CatalogItem;
}