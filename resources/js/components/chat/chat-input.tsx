import { Loader2, SendIcon } from 'lucide-react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from '../ui/input-group';
import { useState } from 'react';

export default function ChatInput({query, loading}) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleClick = () => {
        query(inputValue);
    }
    return (
        <InputGroup>
            <InputGroupTextarea
                placeholder={`Ask me anything about "The Office".`}
                value={inputValue}
                onChange={handleInputChange}
            />
            <InputGroupAddon align="block-end">
                <InputGroupButton
                    variant="default"
                    size={'sm'}
                    className="ml-auto"
                    onClick={handleClick}
                    disabled={loading}
                >
                    {loading ? <Loader2 className='animate-spin size-4' /> :<SendIcon />}
                    Send
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    );
}
