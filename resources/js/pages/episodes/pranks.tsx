import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import pranks from '@/routes/pranks';
import { Prank } from '@/types/models';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<Prank>[] = [
    {
        accessorKey: 'description',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Quote" />
        ),
        cell: ({ row }) => (
            <div className="line-clamp-2 max-w-3xl text-wrap">
                {row.original.description}
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={pranks.edit(row.original.id).url}
                deleteRoute={pranks.destroy(row.original.id).url}
            />
        ),
    },
];

export default function EpisodesPranks({ data }: { data: Prank[] }) {
    return (
        <DataTable
            columns={columns}
            data={data}
            createRoute={pranks.create().url}
            getEditRoute={(id: number) => pranks.edit(id).url}
        />
    );
}
