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
 * Extracts YouTube Video ID from HTML content
 */
export function getYoutubeVideoId(htmlContent: string): string | null {
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
            return match[1];
        }
    }

    return null;
}

/**
 * Gets the best available thumbnail URL for a YouTube video
 * We optimistically return maxresdefault, and let the client handle fallback if it 404s
 */
export function getBestYoutubeThumbnail(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/**
 * Fetches all guides (type=pseo) from the API
 * Now with higher limit to support growing dataset (200+)
 */
async function fetchAllGuides(): Promise<Guide[]> {
    try {
        // Fetch with a high limit to get all guides (increased from 100 to 300)
        const res = await fetch(`${SAAS_API_URL}/api/public/pages?projectId=${PROJECT_ID}&type=pseo&limit=300`, {
            next: { revalidate: 3600 },
            signal: AbortSignal.timeout(15000) // increased timeout for larger payload
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
 * Public wrapper to get all pSEO guides
 */
export async function getAllPseoGuides(): Promise<Guide[]> {
    return await fetchAllGuides();
}

/**
 * Filters guides by category/type (e.g., 'Folding Knife', 'Fixed Blade')
 * This looks at the `schema.Type` or `schema.productType` field
 */
export async function getGuidesByCategory(category: string): Promise<Guide[]> {
    const allGuides = await fetchAllGuides();
    if (allGuides.length === 0) return [];

    const lowerCategory = category.toLowerCase();

    // Fetch details for all guides to check schema? 
    // Ideally, we should request this filter from the API, but for now we filter client-side (server-side in Next.js)
    // To make this efficient, we might need to fetch content details for *all* 200 items which is heavy.
    // OPTIMIZATION: Does 'fetchAllGuides' return schema? 
    // Based on `view_file` output earlier, `fetchAllGuides` returns `pages` array. 
    // Usually list endpoints return minimal data.
    // If we need schema, we have to fetch details. 
    // 200 requests is too many. 
    // STRATEGY CHECK: The User mentioned "We have approximately 200 pSEO pages".
    // fetching 200 pages details sequentially or even parallel is slow.
    // We will try to fetch details in batches, or check if the list endpoint returns any tags/metadata we can use.

    // For now, let's implement a batch fetch for *all* items to build the index. 
    // Since this is static generation (mostly), it might be okay.
    // But for a dynamic page, it will be slow.
    // Let's assume for now we need to fetch details to get the category.

    // BETTER APPROACH: Use `fetchRandomGuidesWithThumbnails` logic but for specific category?
    // Let's first get all guides, then fetch details for them in parallel batches, 
    // then filter. This is heavy but necessary if the list endpoint doesn't have the data.

    // Wait, the user said "Vi har ju i header sidorna /folding-knives och fixed-blades".
    // Maybe the URL or Title contains the clue?
    // "Benchmade Bugout 535" -> Folding.
    // "Ka-Bar USMC" -> Fixed.
    // It's not reliable to guess from title. We need the schema.

    // Let's fetch details for ALL guides. 
    // We will cache this aggressively.

    const detailedGuides = await fetchAllGuidesWithDetails();

    return detailedGuides.filter(g => {
        const type = g.schema?.Type || g.schema?.productType || '';
        return type.toLowerCase().includes(lowerCategory);
    });
}


/**
 * Fetches detailed content for a specific guide using slug
 */
async function fetchGuideContent(slug: string): Promise<any> {
    try {
        const res = await fetch(`${SAAS_API_URL}/api/public/content?projectId=${PROJECT_ID}&slug=${slug}`, {
            next: { revalidate: 3600 },
            signal: AbortSignal.timeout(8000) // 8s timeout
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error(`Error fetching content for ${slug}:`, error);
        return null;
    }
}

/**
 * Main function to get random guides with thumbnails
 */
export async function fetchRandomGuidesWithThumbnails(count: number = 12): Promise<Guide[]> {
    // 1. Get all guides
    const allGuides = await fetchAllGuides();

    if (allGuides.length === 0) return [];

    // 2. Shuffle and select 'count' items
    const shuffled = allGuides.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    // 3. Fetch details for selected items in batches to avoid rate limiting
    // Note: With optimized getBestYoutubeThumbnail (sync), we only do 1 request per item.
    // 30 items = 30 requests. Limit is 50. Safe.
    const BATCH_SIZE = 5;
    const detailedGuides: Guide[] = [];

    for (let i = 0; i < selected.length; i += BATCH_SIZE) {
        const batch = selected.slice(i, i + BATCH_SIZE);

        const batchResults = await Promise.all(
            batch.map(async (guide) => {
                const details = await fetchGuideContent(guide.slug);
                let thumbnail = null;

                if (details && details.contentHtml) {
                    const videoId = getYoutubeVideoId(details.contentHtml);
                    if (videoId) {
                        thumbnail = getBestYoutubeThumbnail(videoId);
                    }
                }

                return {
                    ...guide,
                    thumbnail: thumbnail || 'https://placehold.co/600x400/222/333?text=Review', // Low-res placeholder fallback
                    url: `/guides/${guide.slug}`,
                    schema: details?.schema || {}
                };
            })
        );

        detailedGuides.push(...batchResults);
    }

    return detailedGuides;
}

/**
 * Fetches additional guides, excluding specific slugs to avoid duplicates
 */
export async function fetchGuidesExcluding(count: number, excludeSlugs: string[]): Promise<Guide[]> {
    // 1. Get all guides
    const allGuides = await fetchAllGuides();

    if (allGuides.length === 0) return [];

    // 2. Filter out excluded slugs
    const available = allGuides.filter(g => !excludeSlugs.includes(g.slug));

    // 3. Shuffle and select 'count' items
    const shuffled = available.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    // 4. Fetch details for selected items (reusing logic would be better, but copying for safety/simplicity in this step)
    const BATCH_SIZE = 5;
    const detailedGuides: Guide[] = [];

    for (let i = 0; i < selected.length; i += BATCH_SIZE) {
        const batch = selected.slice(i, i + BATCH_SIZE);

        const batchResults = await Promise.all(
            batch.map(async (guide) => {
                const details = await fetchGuideContent(guide.slug);
                let thumbnail = null;

                if (details && details.contentHtml) {
                    const videoId = getYoutubeVideoId(details.contentHtml);
                    if (videoId) {
                        thumbnail = getBestYoutubeThumbnail(videoId);
                    }
                }

                return {
                    ...guide,
                    thumbnail: thumbnail || 'https://placehold.co/600x400/222/333?text=Review',
                    url: `/guides/${guide.slug}`,
                    schema: details?.schema || {}
                };
            })
        );

        detailedGuides.push(...batchResults);
    }

    return detailedGuides;
}

/**
 * Searches for guides by title or slug
 */
export async function searchGuides(query: string): Promise<Guide[]> {
    if (!query || query.trim().length < 2) return [];

    const lowerQuery = query.toLowerCase().trim();

    // 1. Get all guides (metadata only)
    const allGuides = await fetchAllGuides();

    if (allGuides.length === 0) return [];

    // 2. Filter locally
    const matches = allGuides.filter(g =>
        g.title.toLowerCase().includes(lowerQuery) ||
        g.slug.toLowerCase().includes(lowerQuery)
    );

    if (matches.length === 0) return [];

    // 3. Fetch details for matched items (limit to top 20 to avoid excessive requests)
    const topMatches = matches.slice(0, 20);
    const BATCH_SIZE = 5;
    const detailedGuides: Guide[] = [];

    for (let i = 0; i < topMatches.length; i += BATCH_SIZE) {
        const batch = topMatches.slice(i, i + BATCH_SIZE);

        const batchResults = await Promise.all(
            batch.map(async (guide) => {
                const details = await fetchGuideContent(guide.slug);
                let thumbnail = null;

                if (details && details.contentHtml) {
                    const videoId = getYoutubeVideoId(details.contentHtml);
                    if (videoId) {
                        thumbnail = getBestYoutubeThumbnail(videoId);
                    }
                }

                return {
                    ...guide,
                    thumbnail: thumbnail || 'https://placehold.co/600x400/222/333?text=Review',
                    url: `/guides/${guide.slug}`,
                    schema: details?.schema || {}
                };
            })
        );

        detailedGuides.push(...batchResults);
    }

    return detailedGuides;
}

/**
 * Gets lightweight suggestions for autocomplete
 * Returns only metadata (slug, title, type) to be fast
 */
export async function getGuideSuggestions(query: string, limit: number = 5): Promise<Guide[]> {
    if (!query || query.trim().length < 2) return [];

    const lowerQuery = query.toLowerCase().trim();

    // 1. Get all guides (metadata only)
    const allGuides = await fetchAllGuides();

    if (allGuides.length === 0) return [];

    // 2. Filter locally
    const matches = allGuides.filter(g =>
        g.title.toLowerCase().includes(lowerQuery) ||
        g.slug.toLowerCase().includes(lowerQuery)
    );

    // 3. Return top N matches
    return matches.slice(0, limit).map(g => ({
        ...g,
        url: `/guides/${g.slug}`
    }));
}

/**
 * HELPER: Fetches details for ALL guides to allow deep filtering.
 * CAUTION: This performs many API requests. Use with caching.
 */
async function fetchAllGuidesWithDetails(): Promise<Guide[]> {
    const allGuides = await fetchAllGuides();
    if (allGuides.length === 0) return [];

    const BATCH_SIZE = 10;
    const detailedGuides: Guide[] = [];

    // Process in batches
    for (let i = 0; i < allGuides.length; i += BATCH_SIZE) {
        const batch = allGuides.slice(i, i + BATCH_SIZE);
        const batchResults = await Promise.all(
            batch.map(async (guide) => {
                const details = await fetchGuideContent(guide.slug);
                let thumbnail = null;

                // Try to get thumbnail from content if not present
                if (details && details.contentHtml) {
                    const videoId = getYoutubeVideoId(details.contentHtml);
                    if (videoId) {
                        thumbnail = getBestYoutubeThumbnail(videoId);
                    }
                }

                return {
                    ...guide,
                    thumbnail: thumbnail || 'https://placehold.co/600x400/222/333?text=Review',
                    url: `/guides/${guide.slug}`,
                    schema: details?.schema || {}
                };
            })
        );
        detailedGuides.push(...batchResults);
    }
    return detailedGuides;
}

/**
 * Extracts and returns all unique brands from the guides.
 */
export async function getUniqueBrands(): Promise<string[]> {
    const guides = await fetchAllGuidesWithDetails();
    const brands = new Set<string>();

    guides.forEach(g => {
        const brand = g.schema?.Brand || g.schema?.brand || g.schema?.Manufacturer;
        if (brand) {
            brands.add(brand);
        }
    });

    return Array.from(brands).sort();
}

/**
 * Extracts and returns all unique blade steels.
 */
export async function getUniqueSteels(): Promise<string[]> {
    const guides = await fetchAllGuidesWithDetails();
    const steels = new Set<string>();

    guides.forEach(g => {
        const steel = g.schema?.BladeSteel || g.schema?.bladeSteel || g.schema?.Steel;
        if (steel) {
            steels.add(steel);
        }
    });

    return Array.from(steels).sort();
}

/**
 * Returns guides filtered by a specific brand.
 */
export async function getGuidesByBrand(brand: string): Promise<Guide[]> {
    const guides = await fetchAllGuidesWithDetails();
    const lowerBrand = brand.toLowerCase();

    return guides.filter(g => {
        const b = g.schema?.Brand || g.schema?.brand || g.schema?.Manufacturer || '';
        return b.toLowerCase() === lowerBrand;
    });
}

/**
 * Returns guides filtered by a specific steel.
 */
export async function getGuidesBySteel(steel: string): Promise<Guide[]> {
    const guides = await fetchAllGuidesWithDetails();
    const lowerSteel = steel.toLowerCase();

    return guides.filter(g => {
        const s = g.schema?.BladeSteel || g.schema?.bladeSteel || g.schema?.Steel || '';
        return s.toLowerCase().includes(lowerSteel); // Includes because sometimes it is "CPM S30V" vs "S30V"
    });
}

