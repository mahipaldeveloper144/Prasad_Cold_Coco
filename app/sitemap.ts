import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://prasadcoldcoco.in";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        // If there were individual product pages, they would be listed here:
        // ...products.map(p => ({ url: `${baseUrl}/products/${p.id}`, lastModified: new Date() }))
    ];
}
