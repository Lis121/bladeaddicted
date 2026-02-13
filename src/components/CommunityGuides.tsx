import Link from 'next/link';
import styles from './CommunityGuides.module.css';

const DUMPS = [
    {
        id: '1',
        // Knife/EDC themed image
        image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?auto=format&fit=crop&w=800&q=80',
        title: 'Top 5 Folding Knives for 2026: The Ultimate Guide',
        category: 'GUIDES'
    },
    {
        id: '2',
        // Steel/Technical themed image
        image: 'https://images.unsplash.com/photo-1563273941-ce9a3029cba3?auto=format&fit=crop&w=800&q=80',
        title: 'Understanding Blade Steels: Magnacut vs M390',
        category: 'GUIDES'
    },
    {
        id: '3',
        // Maintenance/Sharpening themed image
        image: 'https://images.unsplash.com/photo-1595188800910-746a5127602e?auto=format&fit=crop&w=800&q=80',
        title: 'How to Sharpen Your Knife Like a Pro',
        category: 'GUIDES'
    }
];

const CommunityGuides = () => {
    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <h2 className={styles.title}>THE LATEST GUIDES</h2>
            </header>

            <div className={styles.grid}>
                {DUMPS.map((dump) => (
                    <Link href={`#${dump.id}`} key={dump.id} className={styles.card}>
                        <div className={styles.imageContainer}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={dump.image} alt={dump.title} className={styles.image} loading="lazy" decoding="async" />
                        </div>

                        <div className={styles.content}>
                            <span className={styles.category}>{dump.category}</span>
                            <h3 className={styles.articleTitle}>{dump.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CommunityGuides;
