import { BundledLanguage } from 'shiki';
import {
    CodeBlock,
    CodeBlockBody,
    CodeBlockContent,
    CodeBlockItem,
} from '../ui/shadcn-io/code-block';

interface SimpleCodeBlockProps {
    code: {
        language: string;
        filename: string;
        code: string;
    };
    className?: string;
}

export function ChatCodeBlock({ code }: SimpleCodeBlockProps) {
    return (
        <CodeBlock data={[code]} defaultValue={code.language}>
            <CodeBlockBody>
                {(item) => (
                    <CodeBlockItem key={item.language} value={item.language}>
                        <CodeBlockContent
                            language={item.language as BundledLanguage}
                            themes={{
                                light: 'github-light',
                                dark: 'dark-plus',
                            }}
                        >
                            {item.code}
                        </CodeBlockContent>
                    </CodeBlockItem>
                )}
            </CodeBlockBody>
        </CodeBlock>
    );
}
