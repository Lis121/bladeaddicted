import { getUniqueBrands } from "@/lib/alstra";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;
export const runtime = 'edge';

export const metadata: Metadata = {
    title: "Knife Brands | BladeAddicted",
    description: "Browse our extensive collection of knife brands. Find reviews and guides for your favorite manufacturers like Benchmade, Spyderco, and more.",
};

export default async function BrandsPage() {
    const brands = await getUniqueBrands();

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
                    Brands
                </h1>

                <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: '#ccc' }}>
                    Select a brand to view all their knives and guides.
                </p>

                {brands.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {brands.map((brand) => (
                            <Link
                                key={brand}
                                href={`/search?q=${encodeURIComponent(brand)}`}
                                style={{
                                    padding: '1.5rem',
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '8px',
                                    border: '1px solid #333',
                                    color: '#fff',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                    fontFamily: 'var(--font-roboto)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '100px',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                {brand}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>No brands found in our database yet.</p>
                )}
            </div>
        </div>
    );
}
