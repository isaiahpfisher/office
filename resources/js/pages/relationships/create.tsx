import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import relationships from '@/routes/relationships';
import { type BreadcrumbItem } from '@/types';
import { Character } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Relationships', href: relationships.index().url },
    { title: 'Create', href: relationships.create().url },
];

const schema = z.object({
    person_one_id: z.number(),
    person_two_id: z.number(),
    outcome: z.enum(['Break Up', 'Marriage', 'Affair', 'Other']),
});

export default function RelationshipsCreate({
    characters,
}: {
    characters: Character[];
}) {
    const handleSubmit = (values: any) => {
        router.post(relationships.store(), values, {
            onError: (errors) => {
                toast.error('Server Validation Failed', {
                    description: JSON.stringify(errors),
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Relationship" />
            <div className="h-full p-6">
                <AutoForm
                    title="Create Relationship"
                    description="Test the UNIQUE constraint on the person fields."
                    schema={schema}
                    columns={3}
                    onSubmit={handleSubmit}
                    defaultValues={{}}
                    fields={[
                        {
                            type: 'select',
                            name: 'person_one_id',
                            label: 'Person One',
                            searchable: true,
                            placeholder: 'Choose an option',
                            options: characters.map((character) => ({
                                label: `${character.first_name} ${character.last_name}`,
                                value: character.id,
                            })),
                        },
                        {
                            type: 'select',
                            name: 'person_two_id',
                            label: 'Person Two',
                            searchable: true,
                            placeholder: 'Choose an option',
                            options: characters.map((character) => ({
                                label: `${character.first_name} ${character.last_name}`,
                                value: character.id,
                            })),
                        },
                        {
                            type: 'select',
                            name: 'outcome',
                            label: 'Outcome',
                            searchable: true,
                            placeholder: 'Choose an option',
                            options: [
                                'Break Up',
                                'Marriage',
                                'Affair',
                                'Other',
                            ].map((option) => ({
                                label: option,
                                value: option,
                            })),
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
