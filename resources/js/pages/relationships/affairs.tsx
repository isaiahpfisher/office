import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import affairs from '@/routes/affairs';
import episodes from '@/routes/episodes';
import { Affair } from '@/types/models';
import { ColumnDef } from '@tanstack/react-table';
import { UsersIcon } from 'lucide-react';

const columns: ColumnDef<Affair>[] = [
    {
        accessorKey: 'cheated',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Cheated Relationship"
            />
        ),
        cell: ({ row }) => {
            const firstPerson = `${row.original.cheated.person_one.first_name} ${row.original.cheated.person_one.last_name}`;
            const secondPerson = `${row.original.cheated.person_two.first_name} ${row.original.cheated.person_two.last_name}`;

            return (
                <DataTableLinkCell
                    label={`${firstPerson} and ${secondPerson}`}
                    editRoute={episodes.edit(row.original.cheated.id).url}
                    icon={<UsersIcon />}
                />
            );
        },
    },
    {
        accessorKey: 'cheating',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Cheating Relationship"
            />
        ),
        cell: ({ row }) => {
            const firstPerson = `${row.original.cheating.person_one.first_name} ${row.original.cheating.person_one.last_name}`;
            const secondPerson = `${row.original.cheating.person_two.first_name} ${row.original.cheating.person_two.last_name}`;

            return (
                <DataTableLinkCell
                    label={`${firstPerson} and ${secondPerson}`}
                    editRoute={episodes.edit(row.original.cheating.id).url}
                    icon={<UsersIcon />}
                />
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={affairs.edit(row.original.id).url}
                deleteRoute={affairs.destroy(row.original.id).url}
            />
        ),
    },
];

export default function RelationshipsAffairs({ data }: { data: Affair[] }) {
    return (
        <DataTable
            columns={columns}
            data={data}
            createRoute={affairs.create().url}
            getEditRoute={(id: number) => affairs.edit(id).url}
        />
    );
}
