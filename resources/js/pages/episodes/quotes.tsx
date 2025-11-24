import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import characters from '@/routes/characters';
import quotes from '@/routes/quotes';
import { Quote } from '@/types/models';
import { ColumnDef } from '@tanstack/react-table';
import { UsersIcon } from 'lucide-react';

const columns: ColumnDef<Quote>[] = [
    {
        accessorKey: 'character',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Character" />
        ),
        cell: ({ row }) => (
            <DataTableLinkCell
                label={`${row.original.character.first_name} ${row.original.character.last_name}`}
                editRoute={characters.edit(row.original.character.id).url}
                icon={<UsersIcon />}
            />
        ),
    },
    {
        accessorKey: 'quote',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Quote" />
        ),
        cell: ({ row }) => (
            <div className="line-clamp-2 max-w-lg text-wrap">
                {row.original.quote}
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={quotes.edit(row.original.id).url}
                deleteRoute={quotes.destroy(row.original.id).url}
            />
        ),
    },
];

export default function EpisodesQuotes({ data }: { data: Quote[] }) {
    return (
        <DataTable
            columns={columns}
            data={data}
            createRoute={quotes.create().url}
            getEditRoute={(id: number) => quotes.edit(id).url}
        />
    );
}
