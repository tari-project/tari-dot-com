export type Lesson = {
    slug: string;
    title: string;
    content: string;
    order: number;
    excerpt?: string;
    thumbnail?: string;
    author?: string;
};

export type LessonsMap = {
    [slug: string]: Lesson;
};

export type AllLessons = Lesson[];

/**
 * Raw accessor. Returns a shallow copy of the bundled lessons array so
 * callers can sort/filter without mutating the imported module state.
 */
export async function getAllLessons(): Promise<Lesson[]> {
    const allLessonsData = await import('../../generated/all-lessons.json');
    return [...(allLessonsData.default as Lesson[])];
}

export async function getLessonBySlug(slug: string): Promise<Lesson | undefined> {
    const lessons = await getAllLessons();
    return lessons.find((lesson) => lesson.slug === slug);
}

export async function getAllLessonSlugs(): Promise<string[]> {
    const lessons = await getAllLessons();
    return lessons.map((lesson) => lesson.slug);
}

/**
 * Sorted accessor. Explicitly returns a new array sorted by `order` ascending.
 * Does not mutate the underlying module-level JSON.
 */
export async function getSortedLessons(): Promise<Lesson[]> {
    const lessons = await getAllLessons();
    return [...lessons].sort((a, b) => a.order - b.order);
}
