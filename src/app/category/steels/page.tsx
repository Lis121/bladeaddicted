import { getUniqueSteels } from "@/lib/alstra";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;
export const runtime = 'edge';

export const metadata: Metadata = {
    title: "Blade Steels Guide | BladeAddicted",
    description: "Browse knives by blade steel. From premium super steels like M390 and MagnaCut to reliable workhorses like D2 and S30V.",
};

export default async function SteelsPage() {
    const steels = await getUniqueSteels();

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
                    Blade Steels
                </h1>

                <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: '#ccc' }}>
                    Select a steel to find knives using that specific alloy.
                </p>

                {steels.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                        gap: '1rem'
                    }}>
                        {steels.map((steel) => (
                            <Link
                                key={steel}
                                href={`/search?q=${encodeURIComponent(steel)}`}
                                style={{
                                    padding: '1rem',
                                    backgroundColor: '#1a1a1a',
                                    borderRadius: '8px',
                                    border: '1px solid #333',
                                    color: '#fff',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                    fontFamily: 'var(--font-roboto-condensed)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '80px',
                                    fontWeight: 'bold'
                                }}
                                className="hover:border-accent-primary hover:text-accent-primary"
                            >
                                {steel}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>No blade steels found in our database yet.</p>
                )}
            </div>
        </div>
    );
}
