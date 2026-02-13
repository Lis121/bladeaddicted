'use server';

import { fetchGuidesExcluding } from "@/lib/alstra";

export async function loadMoreGuides(excludeSlugs: string[]) {
    const guides = await fetchGuidesExcluding(12, excludeSlugs);

    // Map to Product format as expected by ProductCard
    return guides.map(guide => ({
        id: guide.slug,
        name: guide.title,
        image: guide.thumbnail,
        steel: guide.schema?.['Blade Steel'] || guide.schema?.['Steel'] || 'N/A',
        lock: guide.schema?.['Lock Type'] || 'N/A',
        price: guide.schema?.['Price (MSRP)'] || guide.schema?.['MSRP'] || 'Check Price',
        url: guide.url
    }));
}
