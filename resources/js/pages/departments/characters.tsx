import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import actors from '@/routes/actors';
import characterRoutes from '@/routes/characters';
import departments from '@/routes/departments';
import { Character } from '@/types/models';
import { ColumnDef } from '@tanstack/react-table';
import { DramaIcon, LayersIcon } from 'lucide-react';

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
                editRoute={characterRoutes.edit(row.original.id).url}
                deleteRoute={characterRoutes.destroy(row.original.id).url}
            />
        ),
    },
];

export default function DepartmentsCharacters({
    characters,
}: {
    characters: Character[];
}) {
    return (
        <>
            <DataTable
                columns={columns}
                data={characters}
                createRoute={characterRoutes.create().url}
                getEditRoute={(id: number) => characterRoutes.edit(id).url}
            />
        </>
    );
}
