"use client";

import Link from 'next/link';
import { useState } from 'react';
import styles from './ProductCard.module.css';

// Using a simple img tag for placeholder. In production, use Next.js Image component.
const ProductCard = ({ product }: { product: any }) => {
    const productUrl = product.url || `/review/${product.id}`;
    const [imageSrc, setImageSrc] = useState(product.image);

    const handleImageError = () => {
        if (!imageSrc) return;

        // Fallback chain: maxresdefault -> sddefault -> hqdefault -> logo
        if (imageSrc.includes('maxresdefault.jpg')) {
            setImageSrc(imageSrc.replace('maxresdefault.jpg', 'sddefault.jpg'));
        } else if (imageSrc.includes('sddefault.jpg')) {
            setImageSrc(imageSrc.replace('sddefault.jpg', 'hqdefault.jpg'));
        } else {
            // Final fallback: local logo
            setImageSrc('/logo.png');
        }
    };

    // Check if we are showing the fallback logo to apply specific styles
    const isFallback = imageSrc === '/logo.png';

    return (
        <Link href={productUrl} className={styles.card}>
            <div className={styles.imageContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={imageSrc}
                    alt={product.name}
                    className={isFallback ? styles.fallbackImage : styles.image}
                    loading="lazy"
                    decoding="async"
                    onError={handleImageError}
                />
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
