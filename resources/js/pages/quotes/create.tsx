import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import quotes from '@/routes/quotes';
import { type BreadcrumbItem } from '@/types';
import { Character, Episode } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Quotes', href: quotes.index().url },
    { title: 'Create', href: quotes.create().url },
];

const schema = z.object({
    quote: z.string(),
    episode_id: z.number(),
    character_id: z.number(),
});

export default function QuotesCreate({
    episodes,
    characters,
}: {
    episodes: Episode[];
    characters: Character[];
}) {
    const handleSubmit = (values: any) => {
        router.post(quotes.store(), values, {
            onError: (errors) => {
                toast.error('Server Validation Failed', {
                    description: JSON.stringify(errors),
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Quote" />
            <div className="h-full p-6">
                <AutoForm
                    title="Create Quote"
                    description="Add a new quote to our database."
                    schema={schema}
                    columns={2}
                    onSubmit={handleSubmit}
                    defaultValues={{}}
                    fields={[
                        {
                            type: 'select',
                            name: 'character_id',
                            label: 'Character',
                            searchable: true,
                            colSpan: 1,
                            placeholder: 'Choose an option',
                            options: characters.map((character) => ({
                                label: `${character.first_name} ${character.last_name}`,
                                value: character.id,
                            })),
                        },
                        {
                            type: 'select',
                            name: 'episode_id',
                            label: 'Episode',
                            searchable: true,
                            colSpan: 1,
                            placeholder: 'Choose an option',
                            options: episodes.map((episode) => ({
                                label: `${episode.title}`,
                                value: episode.id,
                            })),
                        },
                        {
                            type: 'textarea',
                            name: 'quote',
                            label: 'Quote',
                            colSpan: 2,
                            placeholder:
                                "I'm not superstitious, but I am a little stitious.",
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
