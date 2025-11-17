import { SendIcon } from 'lucide-react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from '../ui/input-group';

export default function ChatInput() {
    return (
        <InputGroup>
            <InputGroupTextarea
                placeholder={`Ask me anything about "The Office".`}
            />
            <InputGroupAddon align="block-end">
                <InputGroupButton
                    variant="default"
                    size={'sm'}
                    className="ml-auto"
                >
                    <SendIcon />
                    Send
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    );
}
