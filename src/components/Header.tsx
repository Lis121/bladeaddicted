"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import { getSuggestionsAction } from '@/app/actions/search';
import { Guide } from '@/lib/alstra';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Guide[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchContainerRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Debounced search for suggestions
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.trim().length >= 2) {
                try {
                    const results = await getSuggestionsAction(searchQuery);
                    setSuggestions(results);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isSearchOpen) setIsSearchOpen(false);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isMenuOpen) setIsMenuOpen(false);
        setTimeout(() => {
            const input = document.querySelector(`.${styles.searchInput}`) as HTMLInputElement;
            if (input) input.focus();
        }, 100);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearchOpen(false);
            setShowSuggestions(false);
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            // Keep query for context or clear it? Clearing for now.
            setSearchQuery('');
        }
    };

    const handleSuggestionClick = (url: string) => {
        setIsSearchOpen(false);
        setShowSuggestions(false);
        setSearchQuery('');
        router.push(url);
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
            <form
                ref={searchContainerRef}
                onSubmit={handleSearch}
                className={`${styles.searchContainer} ${isSearchOpen ? styles.searchOpen : ''}`}
            >
                <input
                    type="text"
                    placeholder="SEARCH GEAR..."
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                        if (searchQuery.trim().length >= 2 && suggestions.length > 0) {
                            setShowSuggestions(true);
                        }
                    }}
                />
                <button type="submit" className={styles.searchSubmitBtn} aria-label="Submit Search">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>

                {/* Autocomplete Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className={styles.suggestionsDropdown}>
                        {suggestions.map((guide) => (
                            <div
                                key={guide.slug}
                                className={styles.suggestionItem}
                                onClick={() => handleSuggestionClick(`/guides/${guide.slug}`)}
                            >
                                {guide.title}
                            </div>
                        ))}
                    </div>
                )}
            </form>
        </header>
    );
};

export default Header;
