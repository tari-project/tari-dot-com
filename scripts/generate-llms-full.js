import { readFile, writeFile } from 'fs/promises';
import path from 'node:path';

const ROOT = path.dirname(import.meta.filename) + '/../';

async function main() {
    let output = '# Tari — Full Content for LLM Ingestion\n\n';
    output += '> This file contains the full text content of tari.com for AI/LLM consumption.\n';
    output += '> Generated at build time. Last updated: ' + new Date().toISOString() + '\n\n';

    // Read updates data
    try {
        const updatesData = JSON.parse(await readFile(path.join(ROOT, 'src/generated/all-updates.json'), 'utf8'));
        output += '## Development Updates\n\n';
        for (const post of updatesData) {
            output += `### ${post.title}\n`;
            output += `Date: ${post.date}\n`;
            output += `URL: https://tari.com/updates/${post.slug}\n\n`;
            if (post.excerpt) {
                output += `${post.excerpt}\n\n`;
            }
            // Strip HTML tags from content for plain text
            const plainContent = post.content
                ? post.content
                      .replace(/<[^>]*>/g, ' ')
                      .replace(/\s+/g, ' ')
                      .trim()
                : '';
            if (plainContent) {
                output += `${plainContent.slice(0, 2000)}\n\n`;
            }
            output += '---\n\n';
        }
    } catch (e) {
        output += '## Development Updates\n\n(Content unavailable)\n\n';
    }

    // Read lessons data
    try {
        const lessonsData = JSON.parse(await readFile(path.join(ROOT, 'src/generated/all-lessons.json'), 'utf8'));
        output += '## Lessons\n\n';
        for (const lesson of lessonsData) {
            output += `### ${lesson.title}\n`;
            output += `URL: https://tari.com/lessons/${lesson.slug}\n\n`;
            if (lesson.excerpt) {
                output += `${lesson.excerpt}\n\n`;
            }
            const plainContent = lesson.content
                ? lesson.content
                      .replace(/<[^>]*>/g, ' ')
                      .replace(/\s+/g, ' ')
                      .trim()
                : '';
            if (plainContent) {
                output += `${plainContent.slice(0, 2000)}\n\n`;
            }
            output += '---\n\n';
        }
    } catch (e) {
        output += '## Lessons\n\n(Content unavailable)\n\n';
    }

    await writeFile(path.join(ROOT, 'public/llms-full.txt'), output);
    console.log('Generated public/llms-full.txt');
}

main().catch(console.error);
