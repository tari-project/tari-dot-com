import type { Metadata } from 'next';
import { orgData } from '@/utils/metadata';
import { StructuredData } from '@/utils/StructuredData';
import type { Article, WithContext } from 'schema-dts';

export const metadata: Metadata = {
    title: 'MiCA Whitepaper',
    description:
        "Read the wXTM Crypto-asset Whitepaper under MiCA. Tari's regulatory compliance document for the European market.",
    alternates: {
        canonical: '/mica-whitepaper',
    },
};

const articleSchema: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'wXTM Crypto-asset Whitepaper under MiCA',
    description:
        "Tari's regulatory compliance whitepaper for the European market under the Markets in Crypto-Assets regulation.",
    publisher: orgData(),
};

export default function WhitepaperPage() {
    return (
        <>
            <StructuredData data={articleSchema} />
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden',
                }}
            >
                {/* Full screen PDF */}
                <iframe
                    src="/wxtm-whitepaper-mica.pdf"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        margin: 0,
                        padding: 0,
                    }}
                    title="wXTM Crypto-asset Whitepaper under MiCA"
                />
            </div>
        </>
    );
}
