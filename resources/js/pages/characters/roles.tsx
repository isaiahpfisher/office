import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import roles from '@/routes/roles';
import { Role } from '@/types/models';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<Role>[] = [
    {
        accessorKey: 'title',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
    },
    {
        accessorKey: 'start_date',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Start Date" />
        ),
        cell: ({ row }) =>
            new Date(row.original.start_date).toLocaleDateString(),
    },
    {
        accessorKey: 'end_date',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="End Date" />
        ),
        cell: ({ row }) => new Date(row.original.end_date).toLocaleDateString(),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={roles.edit(row.original.id).url}
                deleteRoute={roles.destroy(row.original.id).url}
            />
        ),
    },
];

export default function CharactersRoles({ data }: { data: Role[] }) {
    return (
        <DataTable
            columns={columns}
            data={data}
            createRoute={roles.create().url}
            getEditRoute={(id: number) => roles.edit(id).url}
        />
    );
}
