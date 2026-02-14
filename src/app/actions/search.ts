'use server';

import { getGuideSuggestions, Guide } from "@/lib/alstra";

export async function getSuggestionsAction(query: string): Promise<Guide[]> {
    if (!query || query.length < 2) return [];
    return await getGuideSuggestions(query);
}
