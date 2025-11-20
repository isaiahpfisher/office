import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import quotes from '@/routes/quotes';
import { type BreadcrumbItem } from '@/types';
import { Character, Episode, Quote } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const schema = z.object({
    quote: z.string(),
    episode_id: z.number(),
    character_id: z.number(),
});

export default function ThingsSheSaidEdit({
    quote,
    episodes,
    characters,
}: {
    quote: Quote;
    episodes: Episode[];
    characters: Character[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Quotes', href: quotes.index().url },
        { title: 'Edit', href: quotes.edit(quote.id).url },
    ];

    const handleSubmit = (values: any) => {
        router.patch(quotes.update(quote.id), values, {
            onSuccess: () => {
                toast.success('Updated Successfully');
            },
            onError: (errors) => {
                toast.error('Server Validation Failed', {
                    description: JSON.stringify(errors),
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Quote" />
            <div className="h-full p-6">
                <AutoForm
                    title={`Edit ${quote.character.first_name}'s Quote in '${quote.episode.title}'`}
                    description="Update the details of this quote."
                    schema={schema}
                    onSubmit={handleSubmit}
                    columns={2}
                    defaultValues={{ ...quote }}
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
