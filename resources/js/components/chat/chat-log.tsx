import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from '@/components/ui/shadcn-io/ai/conversation';
import { Message, MessageContent } from '@/components/ui/shadcn-io/ai/message';
import { Message as MessageType } from '@/pages/chat';
import { ChatCodeBlock } from './chat-code';

interface ChatLogProps {
    dialogue: MessageType[];
    isLoading?: boolean;
}

export function ChatLog({ dialogue, isLoading }: ChatLogProps) {
    return (
        <Conversation>
            <ConversationContent className="p-4">
                {dialogue.map((message, index) => (
                    <Message
                        key={message.id || index}
                        from={message.role}
                        className="mb-4 gap-2"
                    >
                        <MessageContent
                            className={
                                message.role === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : ''
                            }
                        >
                            {message.role === 'assistant' && message.sql && (
                                <div className="not-prose mb-3 w-full max-w-3xl overflow-hidden rounded-md border shadow-sm">
                                    <ChatCodeBlock
                                        code={{
                                            language: 'sql',
                                            filename: 'executed-query.sql',
                                            code: message.sql,
                                        }}
                                    />
                                </div>
                            )}

                            <div className="leading-relaxed whitespace-pre-wrap">
                                {message.content}
                            </div>
                        </MessageContent>
                    </Message>
                ))}

                {isLoading && (
                    <Message from="assistant" className="gap-2">
                        <MessageContent className="min-w-[60px] bg-muted text-muted-foreground">
                            <div className="flex h-5 items-center gap-1 px-1">
                                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                            </div>
                        </MessageContent>
                    </Message>
                )}
            </ConversationContent>
            <ConversationScrollButton />
        </Conversation>
    );
}
