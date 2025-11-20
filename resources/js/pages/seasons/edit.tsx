import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import seasons from '@/routes/seasons';
import { type BreadcrumbItem } from '@/types';
import { Season } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const schema = z.object({
    number: z.string(),
    start_date: z.date(),
    end_date: z.date(),
    overview: z.string(),
});

export default function SeasonsEdit({ season }: { season: Season }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Seasons', href: seasons.index().url },
        { title: 'Edit', href: seasons.edit(season.id).url },
    ];

    const handleSubmit = (values: any) => {
        router.patch(seasons.update(season.id), values, {
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
            <Head title="Edit Season" />
            <div className="h-full p-6">
                <AutoForm
                    title={`Edit Season #${season.number}`}
                    description="Update the details of this season."
                    schema={schema}
                    onSubmit={handleSubmit}
                    columns={3}
                    defaultValues={{ ...season }}
                    fields={[
                        {
                            type: 'text',
                            specificType: 'number',
                            name: 'number',
                            label: 'Season #',
                            placeholder: '0',
                            description:
                                'There is a UNIQUE constraint on this field.',
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
