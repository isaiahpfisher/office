import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import characters from '@/routes/characters';
import { type BreadcrumbItem } from '@/types';
import { Actor, Character } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    sex: z.enum(['Male', 'Female']),
    actor_id: z.number(),
});

export default function CharactersEdit({
    character,
    actors,
}: {
    character: Character;
    actors: Actor[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Characters', href: characters.index().url },
        { title: 'Edit', href: characters.edit(character.id).url },
    ];

    const handleSubmit = (values: any) => {
        router.patch(characters.update(character.id), values, {
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
            <Head title="Edit Character" />
            <div className="h-full p-6">
                <AutoForm
                    title={`Edit ${character.first_name} ${character.last_name}`}
                    description="Update the details of this character."
                    schema={schema}
                    onSubmit={handleSubmit}
                    columns={2}
                    defaultValues={{ ...character }}
                    fields={[
                        {
                            type: 'text',
                            name: 'first_name',
                            label: 'First Name',
                            placeholder: 'John',
                        },
                        {
                            type: 'text',
                            name: 'last_name',
                            label: 'Last Name',
                            placeholder: 'Doe',
                        },
                        {
                            type: 'select',
                            name: 'sex',
                            label: 'Sex',
                            placeholder: 'Choose an option',
                            options: [
                                { label: 'Male', value: 'Male' },
                                { label: 'Female', value: 'Female' },
                            ],
                        },
                        {
                            type: 'select',
                            name: 'actor_id',
                            label: 'Actor',
                            placeholder: 'Choose an option',
                            options: actors.map((actor) => ({
                                label: `${actor.first_name} ${actor.last_name}`,
                                value: actor.id,
                            })),
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
