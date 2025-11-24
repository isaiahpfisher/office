import { ComboboxField } from '@/components/form/auto-form';
import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import characterEpisodes from '@/routes/character-episodes';
import coldOpens from '@/routes/cold-opens';
import episodes from '@/routes/episodes';
import seasons from '@/routes/seasons';
import { Character, Episode } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { FilmIcon, PopcornIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CharactersEpisodes({
    character,
    episodes: allEpisodes,
}: {
    character: Character;
    episodes: Episode[];
}) {
    const [attachFormOpen, setAttachFormOpen] = useState(false);
    const form = useForm({
        episode_id: '',
    });

    const columns: ColumnDef<Episode>[] = [
        {
            accessorKey: 'air_date',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Air Date" />
            ),
            cell: ({ row }) =>
                new Date(row.original.air_date).toLocaleDateString(),
        },
        {
            accessorKey: 'title',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Title" />
            ),
        },
        {
            accessorKey: 'summary',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Summary" />
            ),
            cell: ({ row }) => (
                <div className="line-clamp-2 max-w-lg text-wrap">
                    {row.original.summary}
                </div>
            ),
        },
        {
            accessorKey: 'season',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Season" />
            ),
            cell: ({ row }) => (
                <DataTableLinkCell
                    icon={<FilmIcon />}
                    label={`#${row.original.season.number}`}
                    editRoute={seasons.edit(row.original.season.id).url}
                />
            ),
        },
        {
            accessorKey: 'cold_open',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Cold Open" />
            ),
            cell: ({ row }) =>
                row.original.cold_open ? (
                    <DataTableLinkCell
                        icon={<PopcornIcon />}
                        label={`Cold Open`}
                        editRoute={
                            coldOpens.edit(row.original.cold_open.id).url
                        }
                    />
                ) : (
                    <div className="text-muted-foreground">N/A</div>
                ),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DataTableActionsCell
                    deleteRoute={
                        characterEpisodes.destroy([
                            character.id,
                            row.original.id,
                        ]).url
                    }
                />
            ),
        },
    ];

    const handleCreate = () => {
        setAttachFormOpen(true);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        form.transform((data) => ({
            ...data,
            character_id: character.id,
        }));

        form.post(characterEpisodes.store().url, {
            onSuccess: () => {
                setAttachFormOpen(false);
                toast.success('Episode Attached');
            },
        });
    };

    return (
        <>
            <DataTable
                columns={columns}
                data={character.episodes}
                createRoute={episodes.create().url}
                createAction={handleCreate}
            />
            <Dialog open={attachFormOpen} onOpenChange={setAttachFormOpen}>
                <DialogContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>Attach Episode</DialogTitle>
                            <DialogDescription>
                                Log another episode in which{' '}
                                {character.first_name} {character.last_name}{' '}
                                appeared.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="w-full">
                            <ComboboxField
                                fieldName="episode_id"
                                value={form.data.episode_id}
                                onChange={(value) =>
                                    form.setData('episode_id', value.toString())
                                }
                                isInvalid={form.errors.episode_id !== undefined}
                                placeholder="Select an episode..."
                                options={allEpisodes
                                    .filter((episode) =>
                                        character.episodes.every(
                                            (e) => e.id !== episode.id,
                                        ),
                                    )
                                    .map((episode) => ({
                                        label: `${episode.title}`,
                                        value: episode.id,
                                    }))}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Attach Episode</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
