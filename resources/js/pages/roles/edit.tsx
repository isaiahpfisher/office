import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import roles from '@/routes/roles';
import { type BreadcrumbItem } from '@/types';
import { Character, Role } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const schema = z.object({
    title: z.string(),
    start_date: z.date(),
    end_date: z.date(),
    character_id: z.string(),
});

export default function RolesEdit({
    role,
    characters,
}: {
    role: Role;
    characters: Character[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Roles', href: roles.index().url },
        { title: 'Edit', href: roles.edit(role.id).url },
    ];

    const handleSubmit = (values: any) => {
        router.patch(roles.update(role.id), values, {
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
            <Head title="Edit Role" />
            <div className="h-full p-6">
                <AutoForm
                    title={`Edit ${role.title}`}
                    description="Update the details of this role."
                    schema={schema}
                    onSubmit={handleSubmit}
                    columns={2}
                    defaultValues={{ ...role }}
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
