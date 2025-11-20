import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import roles from '@/routes/roles';
import { type BreadcrumbItem } from '@/types';
import { Character } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Roles', href: roles.index().url },
    { title: 'Create', href: roles.create().url },
];

const schema = z.object({
    title: z.string(),
    start_date: z.date(),
    end_date: z.date(),
    character_id: z.number(),
});

export default function RolesCreate({
    characters,
}: {
    characters: Character[];
}) {
    const handleSubmit = (values: any) => {
        router.post(roles.store(), values, {
            onError: (errors) => {
                toast.error('Server Validation Failed', {
                    description: JSON.stringify(errors),
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Role" />
            <div className="h-full p-6">
                <AutoForm
                    title="Create Role"
                    description="Add a new role to our database."
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
                            placeholder: 'Choose an option',
                            options: characters.map((character) => ({
                                label: `${character.first_name} ${character.last_name}`,
                                value: character.id,
                            })),
                        },
                        {
                            type: 'text',
                            name: 'title',
                            label: 'Title',
                            placeholder: 'Assistant to the Regional Manager',
                        },
                        {
                            type: 'date',
                            name: 'start_date',
                            label: 'Start Date',
                        },
                        {
                            type: 'date',
                            name: 'end_date',
                            label: 'End Date',
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
