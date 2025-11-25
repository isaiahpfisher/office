import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import episodes from '@/routes/episodes';
import { type BreadcrumbItem } from '@/types';
import { Season } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Episodes', href: episodes.index().url },
    { title: 'Create', href: episodes.create().url },
];

const schema = z.object({
    title: z.string(),
    summary: z.string(),
    air_date: z.date(),
    season_id: z.number(),
});

export default function EpisodesCreate({ seasons }: { seasons: Season[] }) {
    const handleSubmit = (values: any) => {
        router.post(episodes.store(), values, {
            onError: (errors) => {
                toast.error('Server Validation Failed', {
                    description: JSON.stringify(errors),
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Episode" />
            <div className="h-full p-6">
                <AutoForm
                    title="Create Episode"
                    description="Add a new episode to our database."
                    schema={schema}
                    columns={3}
                    onSubmit={handleSubmit}
                    defaultValues={{}}
                    fields={[
                        {
                            type: 'text',
                            name: 'title',
                            label: 'Title',
                            placeholder: 'Diversity Day',
                        },
                        {
                            type: 'date',
                            name: 'air_date',
                            label: 'Air Date',
                        },
                        {
                            type: 'select',
                            name: 'season_id',
                            label: 'Season',
                            searchable: true,
                            placeholder: 'Choose an option',
                            options: seasons.map((season) => ({
                                label: `Season #${season.number}`,
                                value: season.id,
                            })),
                        },
                        {
                            type: 'textarea',
                            name: 'summary',
                            label: 'Summary',
                            colSpan: 3,
                            placeholder: 'Michael gets a little racist.',
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
