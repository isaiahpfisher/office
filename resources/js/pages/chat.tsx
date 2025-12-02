import { ChatEmpty } from '@/components/chat/chat-empty';
import { ChatLog } from '@/components/chat/chat-log';
import ChatInput from '@/components/chat/chat-input';
import AppLayout from '@/layouts/app-layout';
import chatRoutes from '@/routes/chat';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Chat',
        href: chatRoutes.index().url,
    },
];

export default function Chat({ startDialogue }: { startDialogue: string[] }) {
    const [dialogue, setDialogue] = useState<string[]>(startDialogue);
    const [isLoading, setIsLoading] = useState(false);


    const askGemini = async (question: string) => {
        setIsLoading(true);
        axios.get( '/answer', {params: {question: question}})
            .then((res) => {
                const responseData = res.data;
                setDialogue(responseData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Failed to run code:', error);
            });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chat" />
            <div className="flex h-full flex-col justify-between p-6">
                {!dialogue ? (
                    <ChatEmpty />
                ) : (
                    <ChatLog dialogue={dialogue} />
                )}
                <ChatInput query={askGemini} loading={isLoading} />
            </div>
        </AppLayout>
    );
}
