import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { viewport } from '@/app/layout';
import TariLogo from '../ui/TariLogo/TariLogo';
import { SocialIconButtons } from '../ui/Footer/components/SocialLinks/SocialLinks';
import MobileMenuButton from '../ui/Header/MobileMenuButton/MobileMenuButton';
import FAQEntry from '../pages/HomePage/sections/FAQSection/components/FAQEntry/FAQEntry';

describe('Accessibility regressions (#124)', () => {
    it('does not restrict mobile pinch zoom in root viewport metadata', () => {
        expect(viewport.minimumScale).toBeUndefined();
        expect(viewport.maximumScale).toBeUndefined();
    });

    it('provides an accessible name on the TariLogo home link', () => {
        const { getByRole } = render(<TariLogo href="/" />);
        const link = getByRole('link', { name: 'Tari home' });
        expect(link.getAttribute('href')).toBe('/');
    });

    it('provides accessible names on all 6 social icon links', () => {
        const { getByRole } = render(<SocialIconButtons />);
        for (const label of [
            'Tari on X',
            'Tari on Bluesky',
            'Tari on Telegram',
            'Tari on Discord',
            'Tari on GitHub',
            'Tari on YouTube',
        ]) {
            expect(getByRole('link', { name: label })).toBeTruthy();
        }
    });

    it('provides an accessible name and expanded state on MobileMenuButton', () => {
        const { getByRole } = render(<MobileMenuButton />);
        const btn = getByRole('button', { name: 'Open navigation menu' });
        expect(btn.getAttribute('aria-expanded')).toBe('false');
        fireEvent.click(btn);
        expect(btn.getAttribute('aria-expanded')).toBe('true');
        expect(btn.getAttribute('aria-label')).toBe('Close navigation menu');
    });

    it('provides an accessible name and expanded state on FAQEntry toggle button', () => {
        const { getByRole } = render(<FAQEntry question="What is Tari?" answer="<p>A protocol.</p>" />);
        const btn = getByRole('button', { name: 'Expand: What is Tari?' });
        expect(btn.getAttribute('aria-expanded')).toBe('false');
        fireEvent.click(btn);
        expect(btn.getAttribute('aria-expanded')).toBe('true');
        expect(btn.getAttribute('aria-label')).toBe('Collapse: What is Tari?');
    });
});
