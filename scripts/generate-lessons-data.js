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

// Read all markdown files from the lessons directory
const lessonsDirectory = path.join(process.cwd(), '_lessons');
const lessonFiles = fs
    .readdirSync(lessonsDirectory)
    .filter((file) => file.endsWith('.md'))
    .sort((a, b) => {
        // Sort by the numeric prefix in the filename in descending order
        const numA = parseInt(a.split('_')[0], 10) || 0;
        const numB = parseInt(b.split('_')[0], 10) || 0;
        return numB - numA;
    });

// Process all lessons
const allLessons = lessonFiles.map((fileName, index) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(lessonsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Store the order based on the descending sorted file list
    const orderInList = lessonFiles.indexOf(fileName);

    return {
        slug,
        content,
        title: data.title || slug,
        order: orderInList, // Use the position in the sorted array instead of the file prefix
        excerpt: data.excerpt || createExcerpt(content),
        thumbnail: data.thumbnail ? `/assets/lessons/img/${data.thumbnail}` : undefined,
        author: data.author || undefined,
    };
});

// Generate the all lessons data file
fs.writeFileSync(path.join(outputDir, 'all-lessons.json'), JSON.stringify(allLessons, null, 2));

// Generate individual lesson files
const lessonsMap = {};
allLessons.forEach((lesson) => {
    lessonsMap[lesson.slug] = lesson;
});

fs.writeFileSync(path.join(outputDir, 'lessons-map.json'), JSON.stringify(lessonsMap, null, 2));

console.log(`Generated _lessons data at ${outputDir}`);
