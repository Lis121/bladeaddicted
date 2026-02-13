import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand Column */}
                    <div className={styles.brandColumn}>
                        <Link href="/" className={styles.logo}>
                            blade<span>addicted</span>
                        </Link>
                        <p className={styles.tagline}>
                            The ultimate resource for EDC knives, tactical folders, and outdoor blades.
                            Discover the best gear for your daily carry.
                        </p>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h3 className={styles.columnTitle}>Categories</h3>
                        <nav className={styles.linkList}>
                            <Link href="/category/folding-knives" className={styles.link}>Folding Knives</Link>
                            <Link href="/category/fixed-blades" className={styles.link}>Fixed Blades</Link>
                            <Link href="/category/steels" className={styles.link}>Blade Steels</Link>
                            <Link href="/brands" className={styles.link}>Brands</Link>
                        </nav>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h3 className={styles.columnTitle}>Resources</h3>
                        <nav className={styles.linkList}>
                            <Link href="/guides" className={styles.link}>Guides</Link>
                            <Link href="/articles" className={styles.link}>Articles</Link>
                            <Link href="/about" className={styles.link}>About Us</Link>
                            <Link href="/contact" className={styles.link}>Contact</Link>
                        </nav>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h3 className={styles.columnTitle}>Legal</h3>
                        <nav className={styles.linkList}>
                            <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
                            <Link href="/terms" className={styles.link}>Terms of Service</Link>
                            <Link href="/affiliate-disclosure" className={styles.link}>Affiliate Disclosure</Link>
                        </nav>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        &copy; {currentYear} BladeAddicted. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
