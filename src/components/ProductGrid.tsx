"use client";

import { useState } from 'react';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';
import { loadMoreGuides } from '@/app/actions/loadMore';

const ProductGrid = ({ products: initialProducts }: { products: any[] }) => {
    const [products, setProducts] = useState(initialProducts);
    const [loading, setLoading] = useState(false);

    const handleLoadMore = async () => {
        setLoading(true);
        try {
            const currentSlugs = products.map(p => p.id);
            const newProducts = await loadMoreGuides(currentSlugs);
            setProducts(prev => [...prev, ...newProducts]);
        } catch (error) {
            console.error("Failed to load more guides:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className={styles.loadMoreContainer}>
                <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className={styles.loadMoreButton}
                >
                    {loading ? 'Loading...' : 'LOAD MORE products'}
                </button>
            </div>
        </div>
    );
};

export default ProductGrid;
