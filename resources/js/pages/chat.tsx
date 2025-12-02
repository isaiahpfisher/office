import { ChatEmpty } from '@/components/chat/chat-empty';
import ChatInput from '@/components/chat/chat-input';
import { ChatLog } from '@/components/chat/chat-log';
import AppLayout from '@/layouts/app-layout';
import chatRoutes from '@/routes/chat';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Chat',
        href: chatRoutes.index().url,
    },
];

export type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    sql?: string;
    created_at: string;
};

export default function Chat({ messages }: { messages: Message[] }) {
    const [dialogue, setDialogue] = useState<Message[]>(messages || []);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const askGemini = async (question: string) => {
        if (!question.trim()) return;

        const tempId = Math.random().toString(36).substring(7);
        const optimisticMessage: Message = {
            id: tempId,
            role: 'user',
            content: question,
            created_at: new Date().toISOString(),
        };

        setDialogue((prev) => [...prev, optimisticMessage]);
        setQuery('');
        setIsLoading(true);

        try {
            const res = await axios.get(chatRoutes.question().url, {
                params: { question: question },
            });

            setDialogue(res.data);
        } catch (error: any) {
            setDialogue((prev) => prev.filter((msg) => msg.id !== tempId));

            toast.error('Error sending message', {
                description: error.response?.data?.message || error.message,
            });
            setQuery(question);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        router.delete(chatRoutes.destroy().url)
        setQuery('');
        setDialogue([]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chat" />
            <div className="mx-auto flex h-full w-full flex-col justify-between p-6">
                {dialogue.length === 0 ? (
                    <ChatEmpty />
                ) : (
                    <ChatLog dialogue={dialogue} isLoading={isLoading} />
                )}

                <div className="mt-4">
                    <ChatInput
                        query={query}
                        setQuery={setQuery}
                        onSubmit={askGemini}
                        onReset={handleReset}
                        loading={isLoading}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
