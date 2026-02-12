import { notFound } from 'next/navigation';
import VideoReview from '@/components/VideoReview';
import SpecSheet from '@/components/SpecSheet';
import Comparison from '@/components/Comparison';
import styles from './page.module.css';

export const runtime = 'edge';

// Mock data fetcher
const getProduct = async (id: string) => {
    // Simulate async fetch
    const products: Record<string, any> = {
        'benchmade-bugout-535': {
            id: 'benchmade-bugout-535',
            name: 'Benchmade Bugout 535',
            videoId: 'dQw4w9WgXcQ',
            description: 'The Benchmade Bugout 535 is designed for the modern outdoor adventurer, incorporating the lightest, best performing materials in an extremely slim yet ergonomic package.',
            specs: [
                { label: 'Blade Length', value: '3.24"' },
                { label: 'Blade Thickness', value: '0.090"' },
                { label: 'Open Length', value: '7.46"' },
                { label: 'Closed Length', value: '4.22"' },
                { label: 'Weight', value: '1.85oz' },
                { label: 'Handle Thickness', value: '0.42"' },
                { label: 'Blade Style', value: 'Drop Point' },
                { label: 'Blade Steel', value: 'CPM-S30V Premium Stainless Steel' },
                { label: 'Lock Type', value: 'AXIS Lock' },
            ]
        },
        '1': {
            id: '1',
            name: 'Spyderco Para 3',
            videoId: 'JUaAy-vX4JM',
            description: 'The Para 3 distills all the best features of the legendary Para Military 2 into a more compact, carry-friendly format.',
            specs: [
                { label: 'Blade Length', value: '2.95"' },
                { label: 'Overall Length', value: '7.24"' },
                { label: 'Weight', value: '3.40 oz' },
                { label: 'Blade Steel', value: 'CPM S45VN' },
                { label: 'Lock Type', value: 'Compression Lock' },
            ]
        }
    };

    return products[id];
};

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        if (id) {
            return (
                <div style={{ padding: '4rem', textAlign: 'center' }}>
                    <h1>Product Not Found (Mock Data Limit)</h1>
                    <p>Try /review/benchmade-bugout-535 or /review/1</p>
                </div>
            )
        }
        return notFound();
    }

    const currentProduct = product;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{currentProduct.name}</h1>
                <p className={styles.byline}>
                    By <span className={styles.highlight}>BladeAddicted Team</span>
                </p>
            </header>

            <div className={styles.grid}>
                <div className={styles.mainContent}>
                    <VideoReview videoId={currentProduct.videoId} />

                    <div className={styles.reviewText}>
                        <h2 className={styles.sectionTitle}>The Verdict</h2>
                        <p className={styles.paragraph}>{currentProduct.description}</p>
                        <p className={styles.paragraph}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p className={styles.paragraph}>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>

                    <Comparison currentProductId={currentProduct.id} />
                </div>

                <aside className={styles.sidebar}>
                    <SpecSheet specs={currentProduct.specs} />

                    <div className={styles.buyBox}>
                        <h3 className={styles.buyTitle}>Where to Buy</h3>
                        <button className={styles.primaryButton}>Check Price on Amazon</button>
                        <button className={styles.secondaryButton}>BladeHQ</button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
