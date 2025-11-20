import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import pranks from '@/routes/pranks';
import { type BreadcrumbItem } from '@/types';
import { Episode } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pranks', href: pranks.index().url },
    { title: 'Create', href: pranks.create().url },
];

const schema = z.object({
    description: z.string(),
    episode_id: z.number(),
});

export default function PranksCreate({ episodes }: { episodes: Episode[] }) {
    const handleSubmit = (values: any) => {
        router.post(pranks.store(), values, {
            onError: (errors) => {
                toast.error('Server Validation Failed', {
                    description: JSON.stringify(errors),
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Prank" />
            <div className="h-full p-6">
                <AutoForm
                    title="Create Prank"
                    description="Add a new prank to our database."
                    schema={schema}
                    columns={2}
                    onSubmit={handleSubmit}
                    defaultValues={{}}
                    fields={[
                        {
                            type: 'select',
                            name: 'episode_id',
                            label: 'Episode',
                            searchable: true,
                            colSpan: 1,
                            placeholder: 'Choose an option',
                            options: episodes.map((episode) => ({
                                label: `${episode.title}`,
                                value: episode.id,
                            })),
                        },
                        {
                            type: 'textarea',
                            name: 'description',
                            label: 'Description',
                            colSpan: 2,
                            placeholder: "Jim puts Dwight's stapler in jello.",
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
