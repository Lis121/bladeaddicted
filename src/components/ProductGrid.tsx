import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ products }: { products: any[] }) => {
    return (
        <div className={styles.grid}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
