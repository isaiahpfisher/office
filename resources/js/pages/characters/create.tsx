import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import characters from '@/routes/characters';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Characters', href: characters.index().url },
    { title: 'Create', href: characters.create().url },
];

const schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    sex: z.enum(['Male', 'Female']),
});

export default function CharactersCreate() {
    const handleSubmit = (values: any) => {
        router.post(characters.store(), values, {
            onError: (errors) => {
                toast.error('Server Validation Failed', {
                    description: JSON.stringify(errors),
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Character" />
            <div className="h-full p-6">
                <AutoForm
                    title="Create Character"
                    description="Add a new character to our database."
                    schema={schema}
                    columns={3}
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
                        {
                            type: 'select',
                            name: 'sex',
                            label: 'Sex',
                            placeholder: 'Choose an option',
                            options: [
                                { label: 'Male', value: 'Male' },
                                { label: 'Female', value: 'Female' },
                            ],
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
