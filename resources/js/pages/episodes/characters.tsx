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
import actors from '@/routes/actors';
import characterEpisodes from '@/routes/character-episodes';
import departments from '@/routes/departments';
import episodes from '@/routes/episodes';
import { Character, Episode } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { DramaIcon, LayersIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function EpisodesCharacters({
    episode,
    characters: allCharacters,
}: {
    episode: Episode;
    characters: Character[];
}) {
    const [attachFormOpen, setAttachFormOpen] = useState(false);
    const form = useForm({
        character_id: '',
    });

    const columns: ColumnDef<Character>[] = [
        {
            accessorKey: 'first_name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="First Name" />
            ),
        },
        {
            accessorKey: 'last_name',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Last Name" />
            ),
        },
        {
            accessorKey: 'sex',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Sex" />
            ),
        },
        {
            accessorKey: 'department',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Department" />
            ),
            cell: ({ row }) => (
                <DataTableLinkCell
                    icon={<LayersIcon />}
                    label={`${row.original.department.title}`}
                    editRoute={departments.edit(row.original.department.id).url}
                />
            ),
        },
        {
            accessorKey: 'actor',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Actor" />
            ),
            cell: ({ row }) => (
                <DataTableLinkCell
                    icon={<DramaIcon />}
                    label={`${row.original.actor.first_name} ${row.original.actor.last_name}`}
                    editRoute={actors.edit(row.original.actor.id).url}
                />
            ),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DataTableActionsCell
                    deleteRoute={
                        characterEpisodes.destroy([row.original.id, episode.id])
                            .url
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
            episode_id: episode.id,
        }));

        form.post(characterEpisodes.store().url, {
            onSuccess: () => {
                setAttachFormOpen(false);
                toast.success('Character Attached');
            },
        });
    };

    return (
        <>
            <DataTable
                columns={columns}
                data={episode.characters}
                createRoute={episodes.create().url}
                createAction={handleCreate}
            />
            <Dialog open={attachFormOpen} onOpenChange={setAttachFormOpen}>
                <DialogContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>Attach Character</DialogTitle>
                            <DialogDescription>
                                Log another character that appeared in{' '}
                                {episode.title}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="w-full">
                            <ComboboxField
                                fieldName="character_id"
                                value={form.data.character_id}
                                onChange={(value) =>
                                    form.setData(
                                        'character_id',
                                        value.toString(),
                                    )
                                }
                                isInvalid={
                                    form.errors.character_id !== undefined
                                }
                                placeholder="Select an episode..."
                                options={allCharacters
                                    .filter((character) =>
                                        episode.characters.every(
                                            (c) => c.id !== character.id,
                                        ),
                                    )
                                    .map((character) => ({
                                        label: `${character.first_name} ${character.last_name}`,
                                        value: character.id,
                                    }))}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Attach Character</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
