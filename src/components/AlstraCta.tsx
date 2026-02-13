'use client';

import styles from './AlstraCta.module.css';

interface CtaData {
    url: string;
    label: string;
    btn_color?: string;
    btn_text_color?: string;
    template_id?: string;
    val_hash?: string;
    [key: string]: any;
}

interface AlstraCtaProps {
    cta: CtaData;
    apiUrl: string;
}

export default function AlstraCta({ cta, apiUrl }: AlstraCtaProps) {
    const handleClick = () => {
        if (!cta.template_id || !cta.val_hash) return;

        // Fire and forget tracking
        fetch(`${apiUrl}/api/public/cta/click`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                templateId: cta.template_id,
                variationHash: cta.val_hash,
            }),
            keepalive: true, // Important: Ensures request completes after navigation
        }).catch((err) => console.error('Tracking error:', err));
    };

    return (
        <a
            href={cta.url}
            onClick={handleClick}
            className={styles.ctaButton}
            style={{
                backgroundColor: cta.btn_color || '#000',
                color: cta.btn_text_color || '#fff',
            }}
        >
            {cta.label}
        </a>
    );
}
