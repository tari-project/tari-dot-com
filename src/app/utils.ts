import { notFound } from 'next/navigation';

export const pageError = (error: unknown) => {
    // Simple error catcher that sends the user to the not found page if a page throws an
    // exception during render. Use with ErrorBoundary's onError argument.
    console.error('Error fetching lesson:', error);
    notFound();
};
