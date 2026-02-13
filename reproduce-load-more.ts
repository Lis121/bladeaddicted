
// Mock global fetch for local testing if needed, or rely on actual fetch if environment allows
// We will try running this with ts-node or similar.
// Since we are in the same environment, we can import the actual function if we handle imports correctly.
// But we might need to mock fetch for alstra API due to auth/environment? No, access is public public.

import { fetchGuidesExcluding, fetchRandomGuidesWithThumbnails } from "./src/lib/alstra";

async function run() {
    console.log("Fetching initial 12 guides...");
    const initialGuides = await fetchRandomGuidesWithThumbnails(12);
    console.log(`Initial fetch returned ${initialGuides.length} guides.`);

    if (initialGuides.length === 0) {
        console.error("Initial fetch failed.");
        return;
    }

    const currentSlugs = initialGuides.map(g => g.slug);
    console.log("Current slugs:", currentSlugs);

    console.log("Attempting to fetch 12 more, excluding current ones...");
    try {
        const newGuides = await fetchGuidesExcluding(12, currentSlugs);
        console.log(`Load More returned ${newGuides.length} guides.`);

        if (newGuides.length > 0) {
            console.log("First new guide:", newGuides[0].slug);
            const duplicates = newGuides.filter(g => currentSlugs.includes(g.slug));
            if (duplicates.length > 0) {
                console.error("Found duplicates:", duplicates.map(g => g.slug));
            } else {
                console.log("No duplicates found. Logic seems correct.");
            }
        } else {
            console.warn("Load More returned 0 items. Are there enough guides?");
        }

    } catch (error) {
        console.error("Error in fetchGuidesExcluding:", error);
    }
}

run();
