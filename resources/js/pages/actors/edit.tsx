import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import actors from '@/routes/actors';
import { type BreadcrumbItem } from '@/types';
import { Actor } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
});

export default function ActorsEdit({ actor }: { actor: Actor }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Actors', href: actors.index().url },
        { title: 'Edit', href: actors.edit(actor.id).url },
    ];

    const handleSubmit = (values: any) => {
        router.patch(actors.update(actor.id), values, {
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
            <Head title="Edit Actor" />
            <div className="h-full p-6">
                <AutoForm
                    title={`Edit ${actor.first_name} ${actor.last_name}`}
                    description="Update the details of this actor."
                    schema={schema}
                    onSubmit={handleSubmit}
                    columns={2}
                    defaultValues={{ ...actor }}
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
                    ]}
                />
            </div>
        </AppLayout>
    );
}
