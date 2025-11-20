import { AutoForm } from '@/components/form/auto-form';
import AppLayout from '@/layouts/app-layout';
import pranks from '@/routes/pranks';
import { type BreadcrumbItem } from '@/types';
import { Episode, Prank } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';

const schema = z.object({
    description: z.string(),
    episode_id: z.number(),
});
export default function PranksEdit({
    prank,
    episodes,
}: {
    prank: Prank;
    episodes: Episode[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Pranks', href: pranks.index().url },
        { title: 'Edit', href: pranks.edit(prank.id).url },
    ];

    const handleSubmit = (values: any) => {
        router.patch(pranks.update(prank.id), values, {
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
            <Head title="Edit Prank" />
            <div className="h-full p-6">
                <AutoForm
                    title={`Edit Prank from '${prank.episode.title}'`}
                    description="Update the details of this prank."
                    schema={schema}
                    onSubmit={handleSubmit}
                    columns={2}
                    defaultValues={{ ...prank }}
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
