import { AutoForm } from '@/components/form/auto-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import episodes from '@/routes/episodes';
import { type BreadcrumbItem } from '@/types';
import { Character, Episode, Season } from '@/types/models';
import { Head, router } from '@inertiajs/react';
import { toast } from 'sonner';
import * as z from 'zod';
import EpisodesCharacters from './characters';
import EpisodesPranks from './pranks';
import EpisodesQuotes from './quotes';
import EpisodesThingsSheSaid from './things-she-said';

const schema = z.object({
    title: z.string(),
    summary: z.string(),
    air_date: z.date(),
    season_id: z.number(),
});

export default function EpisodesEdit({
    episode,
    seasons,
    characters,
}: {
    episode: Episode;
    seasons: Season[];
    characters: Character[];
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Episodes', href: episodes.index().url },
        { title: 'Edit', href: episodes.edit(episode.id).url },
    ];

    const handleSubmit = (values: any) => {
        router.patch(episodes.update(episode.id), values, {
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
            <Head title="Edit Episode" />
            <div className="h-full space-y-6 p-6">
                <div className="mx-auto w-full sm:max-w-5xl">
                    <Tabs defaultValue="edit">
                        <TabsList>
                            <TabsTrigger value="edit">Edit</TabsTrigger>
                            <TabsTrigger value="characters">
                                Characters
                            </TabsTrigger>
                            <TabsTrigger value="quotes">Quotes</TabsTrigger>
                            <TabsTrigger value="thingsSheSaid">
                                Things She Said
                            </TabsTrigger>
                            <TabsTrigger value="pranks">Pranks</TabsTrigger>
                        </TabsList>
                        <TabsContent value="edit">
                            <AutoForm
                                title={`Edit ${episode.title}`}
                                description="Update the details of this episode."
                                schema={schema}
                                onSubmit={handleSubmit}
                                columns={3}
                                defaultValues={{ ...episode }}
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
                                        placeholder:
                                            'Michael gets a little racist.',
                                    },
                                ]}
                            />
                        </TabsContent>
                        <TabsContent value="characters">
                            <EpisodesCharacters
                                episode={episode}
                                characters={characters}
                            />
                        </TabsContent>
                        <TabsContent value="quotes">
                            <EpisodesQuotes data={episode.quotes} />
                        </TabsContent>
                        <TabsContent value="thingsSheSaid">
                            <EpisodesThingsSheSaid
                                data={episode.things_she_said}
                            />
                        </TabsContent>
                        <TabsContent value="pranks">
                            <EpisodesPranks data={episode.pranks} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}
