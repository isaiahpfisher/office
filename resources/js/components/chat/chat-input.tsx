import { CornerDownLeft, Loader2, RotateCcwIcon, SendIcon } from 'lucide-react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from '../ui/input-group';

interface ChatInputProps {
    query: string;
    setQuery: (value: string) => void;
    onSubmit: (value: string) => void;
    onReset: () => void;
    loading: boolean;
}

export default function ChatInput({
    query,
    setQuery,
    onSubmit,
    onReset,
    loading,
}: ChatInputProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            e.preventDefault();
            if (!loading && query.trim()) {
                onSubmit(query);
            }
        }
    };

    return (
        <div className="relative">
            <InputGroup className="shadow-sm">
                <InputGroupTextarea
                    placeholder={`Ask me anything about "The Office"...`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                    className="min-h-[60px] resize-none pb-10"
                />
                <InputGroupAddon align="block-end">
                    <InputGroupButton
                        variant="default"
                        size={'sm'}
                        className="ml-auto"
                        onClick={() => onSubmit(query)}
                        disabled={loading || !query.trim()}
                    >
                        {loading ? (
                            <Loader2 className="mr-2 size-4 animate-spin" />
                        ) : (
                            <SendIcon className="mr-2 size-4" />
                        )}
                        Send
                    </InputGroupButton>
                    <InputGroupButton
                        variant="ghost"
                        size={'sm'}
                        onClick={onReset}
                        disabled={loading}
                        title="Clear History"
                    >
                        <RotateCcwIcon className="size-4" />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>

            <div className="pointer-events-none absolute bottom-2 left-3 flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className="text-xs font-medium">⌘</span> +{' '}
                <CornerDownLeft className="h-3 w-3" /> to send
            </div>
        </div>
    );
}
