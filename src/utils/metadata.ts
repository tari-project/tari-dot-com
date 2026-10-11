import type { Article, Organization } from 'schema-dts';
import { Update } from '@/services/lib/updates';
import { Lesson } from '@/services/lib/lessons';

export const orgData = (): Organization => ({
    '@type': 'Organization',
    name: 'Tari Community',
    logo: {
        '@type': 'ImageObject',
        url: 'https://tari.com/favicon.png',
    },
});

export const postToLd = (post: Update | Lesson): Article => {
    const publishedInfo: Partial<Article> = {};
    if ('date' in post) {
        publishedInfo.datePublished = post.date;
    }
    return {
        '@type': 'Article',
        headline: post.title,
        publisher: orgData(),
        ...publishedInfo,
    };
};

export const canonicalUrl = (url: string) => ({
    alternates: {
        canonical: url,
    },
    openGraph: {
        url,
    },
});
