import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import departments from '@/routes/departments';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Departments', href: departments.index().url },
    { title: 'Create', href: departments.create().url },
];

const schema = z.object({
    title: z.string().min(5).max(32),
});

export default function DepartmentsCreate() {
    const handleSubmit = (values: any) => {
        router.post(departments.store(), values, {
            onError: (errors) => {
                toast.error('Server Validation Failed', {
                    description: JSON.stringify(errors),
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Department" />
            <div className="h-full p-6">
                <AutoForm
                    title="Create Department"
                    description="Add a new department to our database."
                    schema={schema}
                    onSubmit={handleSubmit}
                    defaultValues={{ title: '' }}
                    fields={[
                        {
                            type: 'text',
                            name: 'title',
                            label: 'Title',
                            placeholder: 'Accounting',
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
