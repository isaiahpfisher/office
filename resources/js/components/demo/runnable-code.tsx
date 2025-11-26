import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { BundledLanguage } from '@/components/ui/shadcn-io/code-block';
import {
    CodeBlock,
    CodeBlockBody,
    CodeBlockContent,
    CodeBlockFilename,
    CodeBlockFiles,
    CodeBlockHeader,
    CodeBlockItem,
} from '@/components/ui/shadcn-io/code-block';
import axios from 'axios';
import { PlayIcon } from 'lucide-react';
import { useState } from 'react';
import { ComboboxField } from '../form/auto-form';

export type RunnableCodeField =
    | {
          type: 'text';
          name: string;
          placeholder?: string;
          defaultValue?: string;
      }
    | {
          type: 'select';
          name: string;
          placeholder?: string;
          options: { label: string; value: string | number }[];
          defaultValue?: string | number;
      };

export interface RunnableCodeProps {
    code: {
        language: string;
        filename: string;
        code: string;
    };
    endpoint: string;
    method?: 'GET' | 'POST';
    fields?: RunnableCodeField[];
}

export default function RunnableCode({
    code,
    method = 'GET',
    endpoint,
    fields = [],
}: RunnableCodeProps) {
    const [formValues, setFormValues] = useState<Record<string, any>>(() => {
        const defaults: Record<string, any> = {};
        fields.forEach((f) => {
            if (f.defaultValue !== undefined) {
                defaults[f.name] = f.defaultValue;
            }
        });
        return defaults;
    });
    const [data, setData] = useState<any[]>([]);

    const handleRun = () => {
        const config = {
            method: method,
            url: endpoint,
            [method === 'GET' ? 'params' : 'data']: formValues,
        };

        axios(config)
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((error) => {
                console.error('Failed to run code:', error);
                setData([
                    { error: error.message, status: error.response?.status },
                ]);
            });
    };

    const updateField = (name: string, value: any) => {
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <CodeBlock data={[code]} defaultValue={code.language}>
            <CodeBlockHeader className="flex items-center justify-between p-2">
                <CodeBlockFiles>
                    {(item) => (
                        <CodeBlockFilename
                            key={item.language}
                            value={item.language}
                        >
                            {item.filename}
                        </CodeBlockFilename>
                    )}
                </CodeBlockFiles>
                <div className="flex items-center gap-2">
                    {fields.map((field) => (
                        <div key={field.name} className="w-[250px]">
                            {field.type === 'text' && (
                                <Input
                                    placeholder={field.placeholder}
                                    value={formValues[field.name] || ''}
                                    onChange={(e) =>
                                        updateField(field.name, e.target.value)
                                    }
                                    className="h-8 text-xs"
                                />
                            )}
                            {field.type === 'select' && (
                                <ComboboxField
                                    fieldName={field.name}
                                    options={field.options}
                                    value={formValues[field.name]}
                                    onChange={(val) =>
                                        updateField(field.name, val)
                                    }
                                    placeholder={field.placeholder}
                                    isInvalid={false}
                                />
                            )}
                        </div>
                    ))}
                    <Button size="sm" onClick={handleRun}>
                        <PlayIcon className="mr-2 h-4 w-4" />
                        Run
                    </Button>
                </div>
            </CodeBlockHeader>
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
            {data.length > 0 && (
                <CodeBlockHeader className="block px-10 py-4">
                    <pre className="block max-h-48 overflow-y-auto py-2 text-xs">
                        <code>{JSON.stringify(data, null, 2)}</code>
                    </pre>
                </CodeBlockHeader>
            )}
        </CodeBlock>
    );
}
