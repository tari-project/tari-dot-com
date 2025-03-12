const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function formatDate(date) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toISOString();
}

function createExcerpt(content, maxLength = 200) {
    let plainText = content
        .replace(/\n+/g, ' ')
        .replace(/#{1,6}\s+/g, '')
        .replace(/(\*\*|__)(.*?)\1/g, '$2')
        .replace(/(\*|_)(.*?)\1/g, '$2')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/!\[([^\]]+)\]\([^)]+\)/g, '')
        .replace(/`{1,3}[^`]*`{1,3}/g, '')
        .trim();

    if (plainText.length > maxLength) {
        plainText = plainText.substring(0, maxLength);
        const lastSpace = plainText.lastIndexOf(' ');
        if (lastSpace > 0) {
            plainText = plainText.substring(0, lastSpace);
        }
        plainText += '...';
    }

    return plainText;
}

// Create the output directory if it doesn't exist
const outputDir = path.join(process.cwd(), 'src/generated');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read all markdown files from the posts directory
const postsDirectory = path.join(process.cwd(), 'posts');
const postFiles = fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));

// Process all posts
const allPosts = postFiles.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const postDate = data.date ? formatDate(data.date) : formatDate(new Date());

    return {
        slug,
        content,
        title: data.title || slug,
        date: postDate,
        excerpt: data.excerpt || createExcerpt(content),
        thumbnail: '/assets/updates/img/' + data.thumbnail || '',
        og_image: data.og_image || '',
        tag: data.tag || '',
    };
});

// Sort posts by date (newest first)
const sortedPosts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

// Generate the all posts data file
fs.writeFileSync(path.join(outputDir, 'all-posts.json'), JSON.stringify(sortedPosts, null, 2));

// Generate individual post files
const postsMap = {};
sortedPosts.forEach((post) => {
    postsMap[post.slug] = post;
});

fs.writeFileSync(path.join(outputDir, 'posts-map.json'), JSON.stringify(postsMap, null, 2));

console.log(`Generated posts data at ${outputDir}`);
