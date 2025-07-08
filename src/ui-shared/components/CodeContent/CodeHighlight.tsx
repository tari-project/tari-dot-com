import { Note, NoteDivider, NoteTitle } from './styles';

interface CodeHighlightProps {
    title: string;
    children: React.ReactNode;
    variant?: 'default' | 'warning' | 'success' | 'info' | 'secondary';
}

function CodeHighlight({ children, title, variant = 'default' }: CodeHighlightProps) {
    return (
        <Note $variant={variant}>
            <NoteTitle>{title}</NoteTitle>
            <NoteDivider />
            <div>{children}</div>
        </Note>
    );
}

export default CodeHighlight;
