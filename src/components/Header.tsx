import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                <Image
                    src="/logo.png"
                    alt="BladeAddicted Logo"
                    width={40}
                    height={40}
                    priority
                />
                <span className={styles.logoText}>blade<span>addicted</span></span>
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
