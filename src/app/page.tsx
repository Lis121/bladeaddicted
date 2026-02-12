
import ProductGrid from "@/components/ProductGrid";

// Placeholder data for the grid
const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Spyderco Para 3',
    image: 'https://img.youtube.com/vi/JUaAy-vX4JM/maxresdefault.jpg',
    steel: 'CPM S45VN',
    lock: 'Compression',
    price: '$180'
  },
  {
    id: '2',
    name: 'Chris Reeve Sebenza 31',
    image: 'https://placehold.co/600x400/222/white?text=Sebenza',
    steel: 'Magnacut',
    lock: 'Frame Lock',
    price: '$500'
  },
  {
    id: '3',
    name: 'Microtech Ultratech',
    image: 'https://placehold.co/600x400/222/green?text=Ultratech',
    steel: 'M390',
    lock: 'OTF Auto',
    price: '$310'
  },
  {
    id: '4',
    name: 'Benchmade 940 Osborne',
    image: 'https://placehold.co/600x400/222/purple?text=940',
    steel: 'S30V',
    lock: 'Axis Lock',
    price: '$205'
  }
];

export default function Home() {
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
        <ProductGrid products={FEATURED_PRODUCTS} />
      </div>
    </div>
  );
}
