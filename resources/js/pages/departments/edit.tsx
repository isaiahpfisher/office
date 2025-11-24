import { AutoForm } from '@/components/form/auto-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import departments from '@/routes/departments';
import { type BreadcrumbItem } from '@/types';
import { Department } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';
import DepartmentsCharacters from './characters';

const schema = z.object({
    title: z.string().min(5).max(32),
});

export default function DepartmentsEdit({
    department,
}: {
    department: Department;
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Departments', href: departments.index().url },
        { title: 'Edit', href: departments.edit(department.id).url },
    ];

    const handleSubmit = (values: any) => {
        router.patch(departments.update(department.id), values, {
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
            <Head title="Edit Department" />
            <div className="h-full space-y-6 p-6">
                <div className="mx-auto w-full sm:max-w-5xl">
                    <Tabs defaultValue="edit">
                        <TabsList>
                            <TabsTrigger value="edit">Edit</TabsTrigger>
                            <TabsTrigger value="characters">
                                Characters
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="edit">
                            <AutoForm
                                title={`Edit ${department.title}`}
                                description="Update the details of this department."
                                schema={schema}
                                onSubmit={handleSubmit}
                                defaultValues={{ ...department }}
                                fields={[
                                    {
                                        type: 'text',
                                        name: 'title',
                                        label: 'Title',
                                        placeholder: 'Accounting',
                                    },
                                ]}
                            />
                        </TabsContent>
                        <TabsContent value="characters">
                            <DepartmentsCharacters
                                characters={department.characters}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}
