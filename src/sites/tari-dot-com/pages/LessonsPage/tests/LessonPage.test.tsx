import { expect, describe, it } from 'vitest';
import { render } from '@testing-library/react';
import LessonPage from '../LessonPage';
import { lessonFactory } from './factories';

describe('LessonPage.tsx', () => {
    it('renders', async () => {
        const lesson = lessonFactory();
        const screen = render(
            <LessonPage lesson={lesson} nextLessons={[lessonFactory(), lessonFactory(), lessonFactory()]}></LessonPage>,
        );
        // Places the title is shown plus the existence of the header in the body.
        await expect(screen.getAllByText(lesson.title).length).toBe(3);
    });
});
