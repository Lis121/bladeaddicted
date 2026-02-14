"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isSearchOpen) setIsSearchOpen(false);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isMenuOpen) setIsMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            {/* Mobile: Hamburger Menu (Left) */}
            <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Menu">
                {isMenuOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                )}
            </button>

            {/* Logo (Center on Mobile, Left on Desktop) */}
            <Link href="/" className={styles.logo}>
                blade<span>addicted</span>
            </Link>

            {/* Mobile: Search Toggle (Right) */}
            <button className={styles.mobileSearchBtn} onClick={toggleSearch} aria-label="Search">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>

            {/* Desktop Navigation */}
            <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                <Link href="/category/folding-knives" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Folding Knives</Link>
                <Link href="/category/fixed-blades" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Fixed Blades</Link>
                <Link href="/category/steels" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Blade Steels</Link>
                <Link href="/brands" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Brands</Link>
            </nav>

            {/* Search Bar */}
            <div className={`${styles.searchContainer} ${isSearchOpen ? styles.searchOpen : ''}`}>
                <input
                    type="text"
                    placeholder="SEARCH GEAR..."
                    className={styles.searchInput}
                />
                <span className={styles.searchIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </span>
            </div>
        </header>
    );
};

export default Header;
