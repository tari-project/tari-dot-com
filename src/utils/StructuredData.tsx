import type { JsonLdObject } from 'schema-dts';

export const StructuredData = ({ data }: { data: JsonLdObject }) => (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/</g, '\\u003c'),
        }}
    ></script>
);
