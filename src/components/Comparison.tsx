import Link from 'next/link';
import styles from './Comparison.module.css';

interface ComparisonProps {
    currentProductId: string;
}

const COMPARISON_DATA = [
    {
        id: '2',
        name: 'Chris Reeve Sebenza 31',
        image: 'https://placehold.co/300x200/222/white?text=Sebenza',
        price: '$500',
        difference: 'Premium Alternative'
    },
    {
        id: '4',
        name: 'Benchmade 940 Osborne',
        image: 'https://placehold.co/300x200/222/purple?text=940',
        price: '$205',
        difference: 'Similar Use Case'
    }
];

const Comparison = ({ currentProductId }: ComparisonProps) => {
    // Filter out current product if needed, for now just show static data
    const comparisons = COMPARISON_DATA.filter(p => p.id !== currentProductId);

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Compare With</h3>
            <div className={styles.grid}>
                {comparisons.map((product) => (
                    <Link href={`/review/${product.id}`} key={product.id} className={styles.card}>
                        <div className={styles.imageContainer}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={product.image} alt={product.name} className={styles.image} loading="lazy" decoding="async" />
                            <span className={styles.badge}>{product.difference}</span>
                        </div>
                        <div className={styles.content}>
                            <h4 className={styles.productName}>{product.name}</h4>
                            <span className={styles.price}>{product.price}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Comparison;
