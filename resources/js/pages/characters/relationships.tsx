import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import characters from '@/routes/characters';
import episodes from '@/routes/episodes';
import relationships from '@/routes/relationships';
import { Relationship } from '@/types/models';
import { ColumnDef } from '@tanstack/react-table';
import { UsersIcon } from 'lucide-react';

const columns: ColumnDef<Relationship>[] = [
    {
        accessorKey: 'person_one',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Person One" />
        ),
        cell: ({ row }) => (
            <DataTableLinkCell
                label={`${row.original.person_one.first_name} ${row.original.person_one.last_name}`}
                editRoute={episodes.edit(row.original.person_one.id).url}
                icon={<UsersIcon />}
            />
        ),
    },
    {
        accessorKey: 'person_two',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Person Two" />
        ),
        cell: ({ row }) => (
            <DataTableLinkCell
                label={`${row.original.person_two.first_name} ${row.original.person_two.last_name}`}
                editRoute={characters.edit(row.original.person_two.id).url}
                icon={<UsersIcon />}
            />
        ),
    },
    {
        accessorKey: 'outcome',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Outcome" />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={relationships.edit(row.original.id).url}
                deleteRoute={relationships.destroy(row.original.id).url}
            />
        ),
    },
];

export default function CharactersRelationships({
    data,
}: {
    data: Relationship[];
}) {
    return (
        <DataTable
            columns={columns}
            data={data}
            createRoute={relationships.create().url}
            getEditRoute={(id: number) => relationships.edit(id).url}
        />
    );
}
