import { getGuidesByCategory } from "@/lib/alstra";
import ProductGrid from "@/components/ProductGrid";
import { Metadata } from "next";

export const revalidate = 3600;
export const runtime = 'edge';

export const metadata: Metadata = {
    title: "Folding Knives Reviews & Guides | BladeAddicted",
    description: "Browse our comprehensive collection of folding knife reviews, specs, and guides. Find the perfect EDC folder for your needs.",
};

export default async function FoldingKnivesPage() {
    // Filter for "Folding" type knives
    const guides = await getGuidesByCategory("Folding");

    // Map guides to ProductCard format
    const products = guides.map(guide => ({
        id: guide.slug,
        name: guide.title,
        image: guide.thumbnail,
        steel: guide.schema?.['Blade Steel'] || guide.schema?.['Steel'] || 'N/A',
        lock: guide.schema?.['Lock Type'] || 'N/A',
        price: guide.schema?.['Price (MSRP)'] || guide.schema?.['MSRP'] || 'Check Price',
        url: guide.url
    }));

    return (
        <div className="page-container">
            <div className="content-grid" style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
                <h1 style={{
                    fontFamily: 'var(--font-roboto)',
                    fontSize: '2.5rem',
                    marginBottom: '2rem',
                    borderLeft: '4px solid var(--accent-primary)',
                    paddingLeft: '1rem',
                    textTransform: 'uppercase'
                }}>
                    Folding Knives
                </h1>

                {products.length > 0 ? (
                    <ProductGrid products={products} />
                ) : (
                    <p>No folding knives found at the moment. Check back soon!</p>
                )}
            </div>
        </div>
    );
}
