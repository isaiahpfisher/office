import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import characters from '@/routes/characters';
import thingsSheSaid from '@/routes/things-she-said';
import { ThingSheSaid } from '@/types/models';
import { ColumnDef } from '@tanstack/react-table';
import { ClapperboardIcon } from 'lucide-react';

const columns: ColumnDef<ThingSheSaid>[] = [
    {
        accessorKey: 'character',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Character" />
        ),
        cell: ({ row }) => (
            <DataTableLinkCell
                label={`${row.original.character.first_name} ${row.original.character.last_name}`}
                editRoute={characters.edit(row.original.character.id).url}
                icon={<ClapperboardIcon />}
            />
        ),
    },
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
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={thingsSheSaid.edit(row.original.id).url}
                deleteRoute={thingsSheSaid.destroy(row.original.id).url}
            />
        ),
    },
];

export default function EpisodesThingsSheSaid({
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
