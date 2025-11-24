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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import actors from '@/routes/actors';
import branchCharacters from '@/routes/branch-characters';
import characters from '@/routes/characters';
import departments from '@/routes/departments';
import { Branch, Character } from '@/types/models';
import { Form } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { DramaIcon, LayersIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function BranchesCharacters({
    branch,
    characters: allCharacters,
}: {
    branch: Branch;
    characters: Character[];
}) {
    const [attachFormOpen, setAttachFormOpen] = useState(false);

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
                        branchCharacters.destroy([row.original.id, branch.id])
                            .url
                    }
                />
            ),
        },
    ];

    const handleCreate = () => {
        setAttachFormOpen(true);
    };

    return (
        <>
            <DataTable
                columns={columns}
                data={branch.characters}
                createRoute={characters.create().url}
                createAction={handleCreate}
            />
            <Dialog open={attachFormOpen} onOpenChange={setAttachFormOpen}>
                <DialogContent>
                    <Form
                        action={branchCharacters.store()}
                        transform={(data) => ({
                            ...data,
                            branch_id: branch.id,
                        })}
                        onSuccess={() => {
                            setAttachFormOpen(false);
                            toast.success('Branch Attached');
                        }}
                        className="space-y-8"
                    >
                        <DialogHeader>
                            <DialogTitle>Attach Character</DialogTitle>
                            <DialogDescription>
                                Log another character that has worked at the{' '}
                                {branch.city} branch.
                            </DialogDescription>
                        </DialogHeader>
                        <Select name="character_id">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a branch" />
                            </SelectTrigger>
                            <SelectContent>
                                {allCharacters
                                    .filter((character) =>
                                        branch.characters.every(
                                            (c) => c.id !== character.id,
                                        ),
                                    )
                                    .map((character) => (
                                        <SelectItem
                                            value={character.id.toString()}
                                            key={character.id}
                                        >
                                            {character.first_name}{' '}
                                            {character.last_name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Attach Character</Button>
                        </DialogFooter>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
