import Link from 'next/link';
import styles from './CommunityGuides.module.css';

const DUMPS = [
    {
        id: '1',
        image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'The Best Community EDC Gear: Pocket Dump from @ruben_b_caeiro',
        category: 'GUIDES'
    },
    {
        id: '2',
        image: 'https://images.unsplash.com/photo-1621252179027-94459d27d3ee',
        title: 'The Best Community EDC Gear: Pocket Dump from Stephen',
        category: 'GUIDES'
    },
    {
        id: '3',
        image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c',
        title: 'The Best Community EDC Gear: Pocket Dump from kamren',
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
                            <img src={dump.image} alt={dump.title} className={styles.image} />
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
