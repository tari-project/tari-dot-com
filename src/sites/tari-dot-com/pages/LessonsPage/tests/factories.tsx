import { Lesson } from '@/services/lib/lessons';
import { nextCount } from '@/tests/utils';

export const lessonFactory = (overrides?: Partial<Lesson>): Lesson => {
    const lessonNumber = nextCount('lesson');
    return {
        slug: `lesson-${lessonNumber}`,
        title: `Lesson ${lessonNumber}`,
        content: `
# Lesson ${lessonNumber}

This is **Lesson ${lessonNumber}**
`,
        order: nextCount('lesson.order', 0),
        ...overrides,
    };
};
