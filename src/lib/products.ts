export interface Product {
    id: string;
    name: string;
    videoId: string;
    description: string;
    specs: { label: string; value: string }[];
}

export const products: Record<string, Product> = {
    'benchmade-bugout-535': {
        id: 'benchmade-bugout-535',
        name: 'Benchmade Bugout 535',
        videoId: 'dQw4w9WgXcQ',
        description: 'The Benchmade Bugout 535 is designed for the modern outdoor adventurer, incorporating the lightest, best performing materials in an extremely slim yet ergonomic package.',
        specs: [
            { label: 'Blade Length', value: '3.24"' },
            { label: 'Blade Thickness', value: '0.090"' },
            { label: 'Open Length', value: '7.46"' },
            { label: 'Closed Length', value: '4.22"' },
            { label: 'Weight', value: '1.85oz' },
            { label: 'Handle Thickness', value: '0.42"' },
            { label: 'Blade Style', value: 'Drop Point' },
            { label: 'Blade Steel', value: 'CPM-S30V Premium Stainless Steel' },
            { label: 'Lock Type', value: 'AXIS Lock' },
        ]
    },
    '1': {
        id: '1',
        name: 'Spyderco Para 3',
        videoId: 'JUaAy-vX4JM',
        description: 'The Para 3 distills all the best features of the legendary Para Military 2 into a more compact, carry-friendly format.',
        specs: [
            { label: 'Blade Length', value: '2.95"' },
            { label: 'Overall Length', value: '7.24"' },
            { label: 'Weight', value: '3.40 oz' },
            { label: 'Blade Steel', value: 'CPM S45VN' },
            { label: 'Lock Type', value: 'Compression Lock' },
        ]
    },
    '2': {
        id: '2',
        name: 'Chris Reeve Sebenza 31',
        videoId: 'M3c3h4sZ9k0',
        description: 'The Chris Reeve Sebenza 31 is the gold standard of folding knives. Known for its "bank-vault" lock-up and heirloom quality, this knife features the Reeve Integral Lock with a ceramic ball interface for longevity and smoothness. With a hollow-ground CPM S45VN blade and sandblasted titanium handles, it is built to work and last a lifetime.',
        specs: [
            { label: 'Blade Length', value: '2.99"' },
            { label: 'Overall Length', value: '6.98"' },
            { label: 'Weight', value: '3.0 oz' },
            { label: 'Blade Steel', value: 'CPM S45VN' },
            { label: 'Lock Type', value: 'Reeve Integral Lock' },
        ]
    }
};

export const getProduct = async (id: string): Promise<Product | undefined> => {
    // Simulate async fetch if needed, for now just return from static data
    return products[id];
};

export const getAllProducts = async (): Promise<Product[]> => {
    return Object.values(products);
};
