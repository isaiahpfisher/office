import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import episodes from '@/routes/episodes';
import thingsSheSaid from '@/routes/things-she-said';
import { ThingSheSaid } from '@/types/models';
import { ColumnDef } from '@tanstack/react-table';
import { ClapperboardIcon } from 'lucide-react';

const columns: ColumnDef<ThingSheSaid>[] = [
    {
        accessorKey: 'saying',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Saying" />
        ),
        cell: ({ row }) => (
            <div className="line-clamp-2 max-w-xl text-wrap">
                {row.original.saying}
            </div>
        ),
    },
    {
        accessorKey: 'episode',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Episode" />
        ),
        cell: ({ row }) => (
            <DataTableLinkCell
                label={`${row.original.episode.title}`}
                editRoute={episodes.edit(row.original.episode.id).url}
                icon={<ClapperboardIcon />}
            />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={thingsSheSaid.edit(row.original.id).url}
                deleteRoute={thingsSheSaid.destroy(row.original.id).url}
            />
        ),
    },
];

export default function CharactersThingsSheSaid({
    data,
}: {
    data: ThingSheSaid[];
}) {
    return (
        <DataTable
            columns={columns}
            data={data}
            createRoute={thingsSheSaid.create().url}
            getEditRoute={(id: number) => thingsSheSaid.edit(id).url}
        />
    );
}
