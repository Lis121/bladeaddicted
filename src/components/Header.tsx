import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                blade<span>addicted</span>
            </Link>

            <nav className={styles.nav}>
                <Link href="/category/folding-knives" className={styles.navLink}>Folding Knives</Link>
                <Link href="/category/fixed-blades" className={styles.navLink}>Fixed Blades</Link>
                <Link href="/category/steels" className={styles.navLink}>Blade Steels</Link>
                <Link href="/brands" className={styles.navLink}>Brands</Link>
            </nav>

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="SEARCH GEAR..."
                    className={styles.searchInput}
                />
                <span className={styles.searchIcon}>In</span> {/* Placeholder icon */}
            </div>
        </header>
    );
};

export default Header;
