import Link from 'next/link';
import styles from './ProductCard.module.css';

// Using a simple img tag for placeholder. In production, use Next.js Image component.
const ProductCard = ({ product }: { product: any }) => {
    return (
        <Link href={`/review/${product.id}`} className={styles.card}>
            <div className={styles.imageContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} className={styles.image} />
                <span className={styles.priceTag}>{product.price}</span>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{product.name}</h3>
                <div className={styles.specs}>
                    <div className={styles.specItem}>
                        <span className={styles.specLabel}>Steel</span>
                        <span>{product.steel}</span>
                    </div>
                    <div className={styles.specItem}>
                        <span className={styles.specLabel}>Lock</span>
                        <span>{product.lock}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
