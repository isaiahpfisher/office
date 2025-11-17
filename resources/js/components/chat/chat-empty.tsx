import { MessagesSquareIcon } from 'lucide-react';

import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';

export function ChatEmpty() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <MessagesSquareIcon />
                </EmptyMedia>
                <EmptyTitle>Hurry up and ask a question.</EmptyTitle>
                <EmptyDescription>
                    You haven't asked any questions yet. Why not?
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
}
