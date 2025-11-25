import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import seasons from '@/routes/seasons';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Seasons', href: seasons.index().url },
    { title: 'Create', href: seasons.create().url },
];

const schema = z.object({
    number: z.string(),
    start_date: z.date(),
    end_date: z.date(),
    overview: z.string(),
});

export default function SeasonsCreate() {
    const handleSubmit = (values: any) => {
        router.post(seasons.store(), values, {
            onError: (errors) => {
                toast.error('Server Validation Failed', {
                    description: JSON.stringify(errors),
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Season" />
            <div className="h-full p-6">
                <AutoForm
                    title="Create Season"
                    description="Add a new season to our database."
                    schema={schema}
                    columns={3}
                    onSubmit={handleSubmit}
                    defaultValues={{}}
                    fields={[
                        {
                            type: 'text',
                            specificType: 'number',
                            name: 'number',
                            label: 'Season #',
                            placeholder: '0',
                        },
                        {
                            type: 'date',
                            name: 'start_date',
                            label: 'Start Date',
                        },
                        {
                            type: 'date',
                            name: 'end_date',
                            label: 'End Date',
                        },
                        {
                            type: 'textarea',
                            name: 'overview',
                            label: 'Overview',
                            colSpan: 3,
                            placeholder: 'Describe the season here.',
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
