import { AutoForm } from '@/components/form/auto-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import relationships from '@/routes/relationships';
import { type BreadcrumbItem } from '@/types';
import { Character, Relationship } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';
import RelationshipsAffairs from './affairs';

const schema = z.object({
    person_one_id: z.number(),
    person_two_id: z.number(),
    outcome: z.enum(['Break Up', 'Marriage', 'Other']),
});

export default function RelationshipsEdit({
    relationship,
    characters,
}: {
    relationship: Relationship;
    characters: Character[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Relationships', href: relationships.index().url },
        { title: 'Edit', href: relationships.edit(relationship.id).url },
    ];

    const handleSubmit = (values: any) => {
        router.patch(relationships.update(relationship.id), values, {
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
            <Head title="Edit Relationship" />
            <div className="h-full space-y-6 p-6">
                <div className="mx-auto w-full sm:max-w-5xl">
                    <Tabs defaultValue="edit">
                        <TabsList>
                            <TabsTrigger value="edit">Edit</TabsTrigger>
                            <TabsTrigger value="affairs">Affairs</TabsTrigger>
                        </TabsList>
                        <TabsContent value="edit">
                            <AutoForm
                                title={`Edit ${relationship.person_one.first_name}'s Relationship with ${relationship.person_two.first_name}`}
                                description="Update the details of this relationship."
                                schema={schema}
                                onSubmit={handleSubmit}
                                columns={3}
                                defaultValues={{ ...relationship }}
                                fields={[
                                    {
                                        type: 'select',
                                        name: 'person_one_id',
                                        label: 'Person One',
                                        searchable: true,
                                        placeholder: 'Choose an option',
                                        options: characters.map(
                                            (character) => ({
                                                label: `${character.first_name} ${character.last_name}`,
                                                value: character.id,
                                            }),
                                        ),
                                    },
                                    {
                                        type: 'select',
                                        name: 'person_two_id',
                                        label: 'Person Two',
                                        searchable: true,
                                        placeholder: 'Choose an option',
                                        options: characters.map(
                                            (character) => ({
                                                label: `${character.first_name} ${character.last_name}`,
                                                value: character.id,
                                            }),
                                        ),
                                    },
                                    {
                                        type: 'select',
                                        name: 'outcome',
                                        label: 'Outcome',
                                        searchable: true,
                                        placeholder: 'Choose an option',
                                        options: [
                                            'Break Up',
                                            'Marriage',
                                            'Other',
                                        ].map((option) => ({
                                            label: option,
                                            value: option,
                                        })),
                                    },
                                ]}
                            />
                        </TabsContent>
                        <TabsContent value="affairs">
                            <RelationshipsAffairs data={relationship.affairs} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}
