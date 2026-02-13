import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products';

const BASE_URL = 'https://bladeaddicted.com';

// Placeholder for future Alstra API integration
async function getAlstraPages(): Promise<MetadataRoute.Sitemap> {
    // In the future, fetch data from Alstra API here
    // const response = await fetch('https://api.alstra.com/...');
    // const data = await response.json();
    return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await getAllProducts();

    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${BASE_URL}/review/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];

    const alstraRoutes = await getAlstraPages();

    return [...staticRoutes, ...productRoutes, ...alstraRoutes];
}
