import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import coldOpens from '@/routes/cold-opens';
import { type BreadcrumbItem } from '@/types';
import { Episode } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Cold Opens', href: coldOpens.index().url },
    { title: 'Create', href: coldOpens.create().url },
];

const schema = z.object({
    description: z.string(),
    episode_id: z.number(),
});

export default function ColdOpensCreate({ episodes }: { episodes: Episode[] }) {
    const handleSubmit = (values: any) => {
        router.post(coldOpens.store(), values, {
            onError: (errors) => {
                toast.error('Server Validation Failed', {
                    description: JSON.stringify(errors),
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Cold Open" />
            <div className="h-full p-6">
                <AutoForm
                    title="Create Cold Open"
                    description="Add a new cold open to our database."
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
                            placeholder:
                                "Kevin spills his chili. It's really sad.",
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
