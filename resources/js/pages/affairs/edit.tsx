import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import affairs from '@/routes/affairs';
import { type BreadcrumbItem } from '@/types';
import { Affair, Relationship } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const schema = z.object({
    cheating_id: z.number(),
    cheated_id: z.number(),
});

export default function AffairsEdit({
    affair,
    relationships,
}: {
    affair: Affair;
    relationships: Relationship[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Affairs', href: affairs.index().url },
        { title: 'Edit', href: affairs.edit(affair.id).url },
    ];

    const handleSubmit = (values: any) => {
        router.patch(affairs.update(affair.id), values, {
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
            <Head title="Edit Affair" />
            <div className="h-full p-6">
                <AutoForm
                    title={`Edit this Affair`}
                    description="Update the details of this affair."
                    schema={schema}
                    onSubmit={handleSubmit}
                    columns={2}
                    defaultValues={{ ...affair }}
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
