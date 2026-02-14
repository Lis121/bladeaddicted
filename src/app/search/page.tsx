import { searchGuides } from "@/lib/alstra";
import ProductGrid from "@/components/ProductGrid";
import Link from 'next/link';
import { Metadata } from 'next';

// Force dynamic rendering to handle searchParams properly
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const params = await searchParams;
    const query = typeof params.q === 'string' ? params.q : '';

    return {
        title: query ? `Search Results for "${query}" - BladeAddicted` : 'Search - BladeAddicted',
        description: `Search results for ${query} on BladeAddicted. Find the best knife reviews and guides.`,
    };
}

export default async function SearchPage({ searchParams }: Props) {
    const params = await searchParams;
    const query = typeof params.q === 'string' ? params.q : '';

    const results = query ? await searchGuides(query) : [];

    // Map guides to ProductCard format
    const products = results.map(guide => ({
        id: guide.slug,
        name: guide.title,
        image: guide.thumbnail,
        steel: guide.schema?.['Blade Steel'] || guide.schema?.['Steel'] || 'N/A',
        lock: guide.schema?.['Lock Type'] || 'N/A',
        price: guide.schema?.['Price (MSRP)'] || guide.schema?.['MSRP'] || 'Check Price',
        url: guide.url
    }));

    return (
        <div style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto', minHeight: '80vh' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{
                    fontFamily: 'var(--font-roboto)',
                    fontSize: '2.5rem',
                    textTransform: 'uppercase',
                    marginBottom: '1rem'
                }}>
                    Search Results
                </h1>

                {query && (
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        Found {products.length} result{products.length !== 1 ? 's' : ''} for <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>"{query}"</span>
                    </p>
                )}
            </div>

            {products.length > 0 ? (
                <ProductGrid products={products} />
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4rem 0',
                    textAlign: 'center',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-primary)'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                    <h2 style={{ marginBottom: '1rem', fontFamily: 'var(--font-roboto)' }}>
                        {query ? 'No matches found' : 'Enter a search term'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '2rem' }}>
                        {query
                            ? `We couldn't find any reviews or guides matching "${query}". Try checking your spelling or use fewer keywords.`
                            : "Type in the search bar above to find specific knives, brands, or guides."}
                    </p>
                    <Link href="/" style={{
                        backgroundColor: 'var(--accent-primary)',
                        color: 'var(--bg-primary)',
                        padding: '1rem 2rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        borderRadius: '4px',
                        textDecoration: 'none'
                    }}>
                        Back to Home
                    </Link>
                </div>
            )}
        </div>
    );
}
