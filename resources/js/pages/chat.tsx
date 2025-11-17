import { ChatEmpty } from '@/components/chat/chat-empty';
import ChatInput from '@/components/chat/chat-input';
import AppLayout from '@/layouts/app-layout';
import { chat } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Chat',
        href: chat().url,
    },
];

export default function Chat() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chat" />
            <div className="flex h-full flex-col justify-between p-4">
                <ChatEmpty />
                <ChatInput />
            </div>
        </AppLayout>
    );
}
