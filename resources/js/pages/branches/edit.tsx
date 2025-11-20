import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import branches from '@/routes/branches';
import { type BreadcrumbItem } from '@/types';
import { Branch } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const schema = z.object({
    city: z.string(),
});

export default function BranchesEdit({ branch }: { branch: Branch }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Branches', href: branches.index().url },
        { title: 'Edit', href: branches.edit(branch.id).url },
    ];

    const handleSubmit = (values: any) => {
        router.patch(branches.update(branch.id), values, {
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
            <Head title="Edit Branch" />
            <div className="h-full p-6">
                <AutoForm
                    title={`Edit the ${branch.city} Branch`}
                    description="Update the details of this branch."
                    schema={schema}
                    onSubmit={handleSubmit}
                    defaultValues={{ ...branch }}
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
