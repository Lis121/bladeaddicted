import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            {/* Fallback image or video background would go here. Using a placeholder for now or a color block if no media. */}
            {/* In a real app, use <video> tag or Next.js Image */}
            <div className={styles.videoBackground} style={{ backgroundColor: '#1a1a1a' }}>
                {/* Placeholder for video embedding */}
            </div>

            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <span className={styles.label}>Knife of the Week</span>
                <h1 className={styles.title}>Benchmade Bugout 535</h1>
                <p className={styles.description}>
                    Ultralight, durable, and designed for the modern outdoorsman.
                    The axis lock mechanism defines smooth operation.
                </p>
                <Link href="/review/benchmade-bugout-535" className={styles.ctaButton}>
                    Read Full Review
                </Link>
            </div>
        </section>
    );
};

export default Hero;
