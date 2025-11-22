import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import episodes from '@/routes/episodes';
import quotes from '@/routes/quotes';
import { Quote } from '@/types/models';
import { ColumnDef } from '@tanstack/react-table';
import { ClapperboardIcon } from 'lucide-react';

const columns: ColumnDef<Quote>[] = [
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
                editRoute={quotes.edit(row.original.id).url}
                deleteRoute={quotes.destroy(row.original.id).url}
            />
        ),
    },
];

export default function CharactersQuotes({ data }: { data: Quote[] }) {
    return (
        <DataTable
            columns={columns}
            data={data}
            createRoute={quotes.create().url}
            getEditRoute={(id: number) => quotes.edit(id).url}
        />
    );
}
