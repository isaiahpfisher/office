import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import thingsSheSaid from '@/routes/things-she-said';
import { type BreadcrumbItem } from '@/types';
import { Character, Episode, ThingSheSaid } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const schema = z.object({
    saying: z.string(),
    episode_id: z.number(),
    character_id: z.number(),
});

export default function ThingsSheSaidEdit({
    thingSheSaid,
    episodes,
    characters,
}: {
    thingSheSaid: ThingSheSaid;
    episodes: Episode[];
    characters: Character[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Things She Said', href: thingsSheSaid.index().url },
        { title: 'Edit', href: thingsSheSaid.edit(thingSheSaid.id).url },
    ];

    const handleSubmit = (values: any) => {
        router.patch(thingsSheSaid.update(thingSheSaid.id), values, {
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
            <Head title="Edit Thing She Said" />
            <div className="h-full p-6">
                <AutoForm
                    title={`Edit the 'thing' that ${thingSheSaid.character.first_name} said she said in '${thingSheSaid.episode.title}'`}
                    description="Update the details of this thing she said."
                    schema={schema}
                    onSubmit={handleSubmit}
                    columns={2}
                    defaultValues={{ ...thingSheSaid }}
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
                            name: 'saying',
                            label: 'Saying',
                            colSpan: 2,
                            placeholder: 'Get your mind out of the gutter.',
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
