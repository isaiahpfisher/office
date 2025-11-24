import { AutoForm } from '@/components/form/auto-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import characters from '@/routes/characters';
import { type BreadcrumbItem } from '@/types';
import { Actor, Branch, Character, Department, Episode } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';
import CharactersBranches from './branches';
import CharactersEpisodes from './episodes';
import CharactersQuotes from './quotes';
import CharactersRelationships from './relationships';
import CharactersRoles from './roles';
import CharactersThingsSheSaid from './things-she-said';

const schema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    sex: z.enum(['Male', 'Female']),
    actor_id: z.number(),
    department_id: z.number(),
});

export default function CharactersEdit({
    character,
    actors,
    departments,
    branches,
    episodes,
}: {
    character: Character;
    actors: Actor[];
    departments: Department[];
    branches: Branch[];
    episodes: Episode[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Characters', href: characters.index().url },
        { title: 'Edit', href: characters.edit(character.id).url },
    ];

    const handleSubmit = (values: any) => {
        router.patch(characters.update(character.id), values, {
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
            <Head title="Edit Character" />
            <div className="h-full space-y-6 p-6">
                <div className="mx-auto w-full sm:max-w-5xl">
                    <Tabs defaultValue="edit">
                        <TabsList>
                            <TabsTrigger value="edit">Edit</TabsTrigger>
                            <TabsTrigger value="roles">Roles</TabsTrigger>
                            <TabsTrigger value="branches">Branches</TabsTrigger>
                            <TabsTrigger value="episodes">Episodes</TabsTrigger>
                            <TabsTrigger value="relationships">
                                Relationships
                            </TabsTrigger>
                            <TabsTrigger value="thingsSheSaid">
                                Things She Said
                            </TabsTrigger>
                            <TabsTrigger value="quotes">Quotes</TabsTrigger>
                        </TabsList>
                        <TabsContent value="edit">
                            <AutoForm
                                title={`Edit ${character.first_name} ${character.last_name}`}
                                description="Update the details of this character."
                                schema={schema}
                                onSubmit={handleSubmit}
                                columns={3}
                                defaultValues={{ ...character }}
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
                                            {
                                                label: 'Female',
                                                value: 'Female',
                                            },
                                        ],
                                    },
                                    {
                                        type: 'select',
                                        name: 'actor_id',
                                        label: 'Actor',
                                        placeholder: 'Choose an option',
                                        options: actors.map((actor) => ({
                                            label: `${actor.first_name} ${actor.last_name}`,
                                            value: actor.id,
                                        })),
                                    },
                                    {
                                        type: 'select',
                                        name: 'department_id',
                                        label: 'Department',
                                        placeholder: 'Choose an option',
                                        options: departments.map(
                                            (department) => ({
                                                label: `${department.title}`,
                                                value: department.id,
                                            }),
                                        ),
                                    },
                                ]}
                            />
                        </TabsContent>
                        <TabsContent value="roles">
                            <CharactersRoles data={character.roles} />
                        </TabsContent>
                        <TabsContent value="relationships">
                            <CharactersRelationships
                                data={character.relationships}
                            />
                        </TabsContent>
                        <TabsContent value="thingsSheSaid">
                            <CharactersThingsSheSaid
                                data={character.things_she_said}
                            />
                        </TabsContent>
                        <TabsContent value="quotes">
                            <CharactersQuotes data={character.quotes} />
                        </TabsContent>
                        <TabsContent value="branches">
                            <CharactersBranches
                                character={character}
                                branches={branches}
                            />
                        </TabsContent>
                        <TabsContent value="episodes">
                            <CharactersEpisodes
                                character={character}
                                episodes={episodes}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}
