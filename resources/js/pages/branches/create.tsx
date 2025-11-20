import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import branches from '@/routes/branches';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Branches', href: branches.index().url },
    { title: 'Create', href: branches.create().url },
];

const schema = z.object({
    city: z.string(),
});

export default function BranchesCreate() {
    const handleSubmit = (values: any) => {
        router.post(branches.store(), values, {
            onError: (errors) => {
                toast.error('Server Validation Failed', {
                    description: JSON.stringify(errors),
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Branch" />
            <div className="h-full p-6">
                <AutoForm
                    title="Create Branch"
                    description="Add a new branch to our database."
                    schema={schema}
                    onSubmit={handleSubmit}
                    defaultValues={{}}
                    fields={[
                        {
                            type: 'text',
                            name: 'city',
                            label: 'City',
                            placeholder: 'Scranton, PA',
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
