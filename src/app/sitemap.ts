import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products';

const BASE_URL = 'https://bladeaddicted.com';

const SAAS_API_URL = "https://www.alstras.com";
const PROJECT_ID = "07ce1ac8-690a-4a27-917d-a49383bbc76b";

type SitemapEntry = {
    url: string;
    lastModified?: string;
};

// Placeholder for future Alstra API integration
async function getAlstraPages(): Promise<MetadataRoute.Sitemap> {
    let pseoPages: MetadataRoute.Sitemap = [];
    let page = 1;

    try {
        while (true) {
            const res = await fetch(`${SAAS_API_URL}/api/public/sitemap?projectId=${PROJECT_ID}&format=json&limit=5000&page=${page}`, {
                next: { revalidate: 3600 }
            });

            if (!res.ok) break;

            const data: SitemapEntry[] = await res.json();
            if (!data || data.length === 0) break;

            const chunks = data.map(item => ({
                url: item.url,
                lastModified: item.lastModified ? new Date(item.lastModified) : new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            }));

            pseoPages = [...pseoPages, ...chunks];

            if (data.length < 5000) break;
            page++;
        }
    } catch (error) {
        console.error('Failed to fetch pSEO sitemap:', error);
    }

    return pseoPages;
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
