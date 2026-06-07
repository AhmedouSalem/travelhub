import type { CatalogApiItem, CatalogCategory, CatalogItem } from "../types/catalog"
import { API_ROUTES } from "./apiRoutes";
import { api } from "./axiosClient";

type GetCatalogParams = {
    category?: CatalogCategory;
    search?: string;
};

const fallbackImagesByCategory: Record<CatalogCategory, string> = {
    MEAL: "/images/menu-mediterraneen.jpg",
    FILM: "/images/destination-japon.jpg",
    NEWSPAPER: "/images/journal-international.jpg",
    ACTIVITY: "/images/atelier-culturel.jpg",
};

function getImageUrl(item: CatalogApiItem): string {
    if (!item.imageUrl || item.imageUrl.includes("example.com")) {
        return fallbackImagesByCategory[item.category];
    }

    return item.imageUrl;
}

function mapCatalogApiItem(item: CatalogApiItem): CatalogItem {
    return {
        id: item._id,
        title: item.title,
        description: item.description,
        category: item.category,
        price: item.price,
        available: item.available,
        imageUrl: getImageUrl(item),
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    };
}

export const catalogApi = {
    getCatalog: async (params: GetCatalogParams = {}): Promise<CatalogItem[]> => {
        const response = await api.get<CatalogApiItem[]>(API_ROUTES.catalog.list, {
            params,
        });

        return response.data.map(mapCatalogApiItem);
    },

    getCatalogItem: async (id: string): Promise<CatalogItem> => {
        const response = await api.get<CatalogApiItem>(
            API_ROUTES.catalog.detail(id),
        );

        return mapCatalogApiItem(response.data);
    },
};