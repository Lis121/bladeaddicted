import { notFound } from "next/navigation";
import { Metadata } from "next";
import AlstraCta from "@/components/AlstraCta";
import styles from "./page.module.css";

export const runtime = 'edge';

// Config - This interacts with your SaaS Platform (Do NOT change to localhost)
const SAAS_API_URL = "https://www.alstras.com";
const PROJECT_ID = "07ce1ac8-690a-4a27-917d-a49383bbc76b";

type Props = {
    params: Promise<{ slug: string[] }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const slug = params.slug.join("/");
    const data = await fetchPseoPage(slug);

    if (!data) return {};

    return {
        title: data.title,
        description: data.excerpt || data.title,
    };
}

export default async function PseoPage(props: Props) {
    const params = await props.params;
    const slug = params.slug.join("/");
    const data = await fetchPseoPage(slug);

    if (!data) return notFound();

    return (
        <main className={styles.container}>


            {/* 
               Tip: Use @tailwindcss/typography plugin for nice styling of raw HTML.
               Add 'prose' class to the container.
            */}
            <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: data.contentHtml }}
            />

            {/* Smart Internal Linking */}
            {data.relatedPages?.length > 0 && (
                <div className={styles.relatedSection}>
                    <h3 className={styles.relatedTitle}>Se även</h3>
                    <div className={styles.grid}>
                        {data.relatedPages.map((page: any) => (
                            <a
                                key={page.url}
                                href={page.url}
                                className={styles.relatedCard}
                            >
                                {page.title}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Headless CTA - Rendered if configured in dashboard */}
            {data.cta && (
                <div className={styles.ctaContainer}>
                    {data.cta.description && (
                        <p className={styles.ctaDescription} style={{ color: data.cta.msg_text_color }}>{data.cta.description}</p>
                    )}
                    <AlstraCta cta={data.cta} apiUrl={SAAS_API_URL} />
                </div>
            )}
        </main>
    );
}

async function fetchPseoPage(slug: string) {
    try {
        // Added &include=related for Smart Linking
        const res = await fetch(`${SAAS_API_URL}/api/public/content?projectId=${PROJECT_ID}&slug=${slug}&include=related`, {
            next: { revalidate: 0 },
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("pSEO Fetch Error:", error);
        return null;
    }
}
