
import ProductGrid from "@/components/ProductGrid";

import { fetchRandomGuidesWithThumbnails } from "@/lib/alstra";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'edge';

export default async function Home() {
  const guides = await fetchRandomGuidesWithThumbnails(10);

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
        <h2 style={{
          fontFamily: 'var(--font-roboto)',
          fontSize: '2rem',
          marginBottom: '2rem',
          borderLeft: '4px solid var(--accent-primary)',
          paddingLeft: '1rem'
        }}>
          Latest Drops
        </h2>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
