import type { CatalogItem } from "../../../types/catalog";

export const mockCatalog: CatalogItem[] = [
    {
        id: "meal-mediterranean",
        title: "Menu Méditerranéen",
        description:
            "A delightful selection of Mediterranean dishes including hummus, falafel, and grilled vegetables.",
        category: "MEAL",
        price: 18,
        available: true,
        imageUrl: "/images/menu-mediterraneen.jpg",
    },
    {
        id: "film-japan",
        title: "Film documentaire - Destination Japon",
        description:
            "Explore the vibrant culture and serene landscapes of Japan in this travel documentary.",
        category: "FILM",
        price: 0,
        available: true,
        imageUrl: "/images/destination-japon.jpg",
    },
    {
        id: "newspaper-international",
        title: "Journal International",
        description:
            "Stay updated with global events and read the latest international headlines.",
        category: "NEWSPAPER",
        price: 4.5,
        available: true,
        imageUrl: "/images/journal-international.jpg",
    },
    {
        id: "activity-cultural",
        title: "Atelier découverte culturelle",
        description:
            "An interactive audio-guided tour of the regions you are passing through.",
        category: "ACTIVITY",
        price: 12,
        available: true,
        imageUrl: "/images/atelier-culturel.jpg",
    },
    {
        id: "meal-breakfast",
        title: "Gourmet Breakfast Box",
        description:
            "Start your journey with freshly baked croissants, artisan jam and hot coffee.",
        category: "MEAL",
        price: 15,
        available: false,
        imageUrl: "/images/breakfast-box.jpg",
    },
    {
        id: "film-action",
        title: "Action Blockbuster: The Matrix",
        description:
            "Experience a classic science-fiction action thriller in full HD during your journey.",
        category: "FILM",
        price: 5,
        available: true,
        imageUrl: "/images/action-film.jpg",
    },
    {
        id: "newspaper-business",
        title: "Business Weekly",
        description:
            "The premier weekly magazine for market trends, financial news and insights.",
        category: "NEWSPAPER",
        price: 6,
        available: true,
        imageUrl: "/images/business-weekly.jpg",
    },
    {
        id: "activity-yoga",
        title: "In-flight Yoga Guide",
        description:
            "A series of seated stretches and breathing exercises designed for travel.",
        category: "ACTIVITY",
        price: 0,
        available: true,
        imageUrl: "/images/yoga-guide.jpg",
    },
];