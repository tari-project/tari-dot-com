import type { Article, Organization, WithContext } from 'schema-dts';
import { Update } from '@/services/lib/updates';
import { Lesson } from '@/services/lib/lessons';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

export const orgData = (): Organization => ({
    '@type': 'Organization',
    name: 'Tari Community',
    logo: {
        '@type': 'ImageObject',
        url: 'https://tari.com/favicon.png',
    },
});

export const postToLd = (post: Update | Lesson): WithContext<Article> => {
    const optionalInfo: Partial<Article> = {};
    if ('date' in post) {
        // Lessons don't currently have a published date annotated.
        optionalInfo.datePublished = post.date;
    }
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        publisher: orgData(),
        image: post.thumbnail,
        author: post.author,
        ...optionalInfo,
    };
};

export const defaultOgContent = (): OpenGraph => ({
    images: [
        {
            url: 'https://tari.com/tari-og.png?v=2',
            width: 1200,
            height: 630,
            alt: 'Tari',
        },
    ],
    siteName: 'Tari.com',
    type: 'website',
});

export const canonicalUrl = (url: string): Partial<Metadata> => ({
    alternates: {
        canonical: url,
    },
    openGraph: {
        ...defaultOgContent(),
        url,
    },
});
