// Config
const SAAS_API_URL = "https://www.alstras.com";
const PROJECT_ID = "07ce1ac8-690a-4a27-917d-a49383bbc76b";

export interface Guide {
    slug: string;
    title: string;
    type: string;
    thumbnail?: string; // Optional, derived from content
    url?: string; // Derived full URL
    schema?: any; // Product schema/specs
}

/**
 * Fetches proper YouTube thumbnail from HTML content
 */
export function getYoutubeThumbnail(htmlContent: string): string | null {
    // Look for various YouTube embed patterns
    const patterns = [
        /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
        /youtu\.be\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
        /youtube-nocookie\.com\/embed\/([a-zA-Z0-9_-]{11})/
    ];

    for (const pattern of patterns) {
        const match = htmlContent.match(pattern);
        if (match && match[1]) {
            return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
        }
    }

    return null;
}

/**
 * Fetches all guides (type=pseo) from the API
 */
async function fetchAllGuides(): Promise<Guide[]> {
    try {
        // Fetch with a high limit to get all guides
        const res = await fetch(`${SAAS_API_URL}/api/public/pages?projectId=${PROJECT_ID}&type=pseo&limit=100`, {
            next: { revalidate: 3600 },
            signal: AbortSignal.timeout(8000) // 8s timeout
        });

        if (!res.ok) return [];

        const data = await res.json();
        return data.pages || [];
    } catch (error) {
        console.error("Error fetching guides list:", error);
        return [];
    }
}

/**
 * Fetches detailed content for a specific guide using slug
 */
async function fetchGuideContent(slug: string): Promise<any> {
    try {
        const res = await fetch(`${SAAS_API_URL}/api/public/content?projectId=${PROJECT_ID}&slug=${slug}`, {
            next: { revalidate: 3600 },
            signal: AbortSignal.timeout(5000) // 5s timeout
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error(`Error fetching content for ${slug}:`, error);
        return null;
    }
}

/**
 * Main function to get 10 random guides with thumbnails
 */
export async function fetchRandomGuidesWithThumbnails(count: number = 10): Promise<Guide[]> {
    // 1. Get all guides
    const allGuides = await fetchAllGuides();

    if (allGuides.length === 0) return [];

    // 2. Shuffle and select 'count' items
    const shuffled = allGuides.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    // 3. Fetch details for selected items in parallel to get content (and thumbnail)
    const detailedGuides = await Promise.all(
        selected.map(async (guide) => {
            const details = await fetchGuideContent(guide.slug);
            let thumbnail = null;

            if (details && details.contentHtml) {
                thumbnail = getYoutubeThumbnail(details.contentHtml);
            }

            // If no thumbnail found, use a fallback specific to knifes/EDC if possible, or generic
            // For now we'll allow null and handle it in UI

            return {
                ...guide,
                thumbnail: thumbnail || 'https://placehold.co/600x400/222/333?text=Review', // Low-res placeholder fallback
                url: `/guides/${guide.slug}`,
                schema: details?.schema || {}
            };
        })
    );

    return detailedGuides;
}
