import { expect, describe, it } from 'vitest';
import { render } from '@testing-library/react';
import LessonPage from '../LessonPage';
import { lessonFactory } from './factories';

describe('LessonPage.tsx', () => {
    it('renders', () => {
        const lesson = lessonFactory();
        const screen = render(
            <LessonPage lesson={lesson} nextLessons={[lessonFactory(), lessonFactory(), lessonFactory()]}></LessonPage>,
        );
        expect(screen.findByText(lesson.title));
    });
});
