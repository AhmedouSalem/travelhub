export type CatalogCategory = "FILM" | "NEWSPAPER" | "MEAL" | "ACTIVITY";

export type CatalogItem = {
    id: string;
    title: string;
    description: string;
    category: CatalogCategory;
    price: number;
    available: boolean;
    imageUrl: string;
    createdAt?: string;
    updatedAt?: string;
};

export type CatalogApiItem = {
    _id: string;
    title: string;
    description: string;
    category: CatalogCategory;
    price: number;
    available: boolean;
    imageUrl?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
};