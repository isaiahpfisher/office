import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import actors from '@/routes/actors';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Actors', href: actors.index().url },
    { title: 'Create', href: actors.create().url },
];

const schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
});

export default function ActorsCreate() {
    const handleSubmit = (values: any) => {
        router.post(actors.store(), values, {
            onError: (errors) => {
                toast.error('Server Validation Failed', {
                    description: JSON.stringify(errors),
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Actor" />
            <div className="h-full p-6">
                <AutoForm
                    title="Create Actor"
                    description="Add a new actor to our database."
                    schema={schema}
                    columns={2}
                    onSubmit={handleSubmit}
                    defaultValues={{}}
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
