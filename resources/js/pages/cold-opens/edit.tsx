import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import coldOpens from '@/routes/cold-opens';
import { type BreadcrumbItem } from '@/types';
import { ColdOpen, Episode } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const schema = z.object({
    description: z.string(),
    episode_id: z.number(),
});
export default function ColdOpensEdit({
    coldOpen,
    episodes,
}: {
    coldOpen: ColdOpen;
    episodes: Episode[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Cold Opens', href: coldOpens.index().url },
        { title: 'Edit', href: coldOpens.edit(coldOpen.id).url },
    ];

    const handleSubmit = (values: any) => {
        router.patch(coldOpens.update(coldOpen.id), values, {
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
            <Head title="Edit Cold Open" />
            <div className="h-full p-6">
                <AutoForm
                    title={`Edit Cold Open from '${coldOpen.episode.title}'`}
                    description="Update the details of this cold open."
                    schema={schema}
                    onSubmit={handleSubmit}
                    columns={2}
                    defaultValues={{ ...coldOpen }}
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
