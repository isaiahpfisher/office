import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import affairs from '@/routes/affairs';
import { type BreadcrumbItem } from '@/types';
import { Relationship } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Affairs', href: affairs.index().url },
    { title: 'Create', href: affairs.create().url },
];

const schema = z.object({
    cheating_id: z.number(),
    cheated_id: z.number(),
});

export default function AffairsCreate({
    relationships,
}: {
    relationships: Relationship[];
}) {
    const handleSubmit = (values: any) => {
        router.post(affairs.store(), values, {
            onError: (errors) => {
                toast.error('Server Validation Failed', {
                    description: JSON.stringify(errors),
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Affair" />
            <div className="h-full p-6">
                <AutoForm
                    title="Create Affair"
                    description="Add a new affair to our database."
                    schema={schema}
                    columns={2}
                    onSubmit={handleSubmit}
                    defaultValues={{}}
                    fields={[
                        {
                            type: 'select',
                            name: 'cheating_id',
                            label: 'Cheating Relationship',
                            searchable: true,
                            colSpan: 1,
                            placeholder: 'Choose an option',
                            options: relationships.map((relationship) => ({
                                label: `${relationship.person_one.first_name} and ${relationship.person_two.first_name}`,
                                value: relationship.id,
                            })),
                        },
                        {
                            type: 'select',
                            name: 'cheated_id',
                            label: 'Cheated Relationship',
                            searchable: true,
                            colSpan: 1,
                            placeholder: 'Choose an option',
                            options: relationships.map((relationship) => ({
                                label: `${relationship.person_one.first_name} and ${relationship.person_two.first_name}`,
                                value: relationship.id,
                            })),
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
