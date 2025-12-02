import { MessagesSquareIcon } from 'lucide-react';

import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';

export function ChatLog({ dialogue }: { dialogue: string[] }) {
    return (
        <>
            {dialogue.map((line: string, index: number) => (
                <p key={index}>{line}</p>
            ))}
        </>
    );
}
