import { AutoForm } from '@/components/form/auto-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import branches from '@/routes/branches';
import { type BreadcrumbItem } from '@/types';
import { Branch, Character } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';
import BranchesCharacters from './characters';

const schema = z.object({
    city: z.string(),
});

export default function BranchesEdit({
    branch,
    characters,
}: {
    branch: Branch;
    characters: Character[];
}) {
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
                        </TabsContent>
                        <TabsContent value="characters">
                            <BranchesCharacters
                                characters={characters}
                                branch={branch}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}
