import Link from 'next/link';
import styles from './KnifeOfTheWeek.module.css';

const KnifeOfTheWeek = () => {
    return (
        <section className={styles.section}>
            <div className={styles.label}>Knife of the Week</div>

            <h2 className={styles.title}>
                BENCHMADE<br />
                BUGOUT 535
            </h2>

            <p className={styles.description}>
                Ultralight, durable, and designed for the modern outdoorsman.
                The axis lock mechanism defines smooth operation.
            </p>

            <Link href="/review/benchmade-bugout-535" className={styles.button}>
                Read Full Review
            </Link>
        </section>
    );
};

export default KnifeOfTheWeek;
