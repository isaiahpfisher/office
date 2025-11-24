import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
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
import branchCharacters from '@/routes/branch-characters';
import branches from '@/routes/branches';
import { Branch, Character } from '@/types/models';
import { Form } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CharactersBranches({
    character,
    branches: allBranches,
}: {
    character: Character;
    branches: Branch[];
}) {
    const [attachFormOpen, setAttachFormOpen] = useState(false);

    const columns: ColumnDef<Branch>[] = [
        {
            accessorKey: 'city',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="City" />
            ),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DataTableActionsCell
                    deleteRoute={
                        branchCharacters.destroy([
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

    return (
        <>
            <DataTable
                columns={columns}
                data={character.branches}
                createRoute={branches.create().url}
                createAction={handleCreate}
            />
            <Dialog open={attachFormOpen} onOpenChange={setAttachFormOpen}>
                <DialogContent>
                    <Form
                        action={branchCharacters.store()}
                        transform={(data) => ({
                            ...data,
                            character_id: character.id,
                        })}
                        onSuccess={() => {
                            setAttachFormOpen(false);
                            toast.success('Branch Attached');
                        }}
                        className="space-y-8"
                    >
                        <DialogHeader>
                            <DialogTitle>Attach Branch</DialogTitle>
                            <DialogDescription>
                                Log another branch that {character.first_name}{' '}
                                {character.last_name} has worked at.
                            </DialogDescription>
                        </DialogHeader>
                        <Select name="branch_id">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a branch" />
                            </SelectTrigger>
                            <SelectContent>
                                {allBranches
                                    .filter((branch) =>
                                        character.branches.every(
                                            (b) => b.id !== branch.id,
                                        ),
                                    )
                                    .map((branch) => (
                                        <SelectItem
                                            value={branch.id.toString()}
                                            key={branch.id}
                                        >
                                            {branch.city}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Attach Branch</Button>
                        </DialogFooter>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
