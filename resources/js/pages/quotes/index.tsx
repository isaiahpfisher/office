import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import AppLayout from '@/layouts/app-layout';
import characters from '@/routes/characters';
import episodes from '@/routes/episodes';
import quotes from '@/routes/quotes';
import { type BreadcrumbItem } from '@/types';
import { Quote } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ClapperboardIcon, UsersIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quotes',
        href: quotes.index().url,
    },
];

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
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={quotes.edit(row.original.id).url}
                deleteRoute={quotes.destroy(row.original.id).url}
            />
        ),
    },
];

export default function QuotesIndex({ data }: { data: Quote[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quotes" />
            <div className="h-full p-6">
                <DataTable
                    title="Quotes"
                    description="Browse quotes from the show."
                    columns={columns}
                    data={data}
                    createRoute={quotes.create().url}
                    getEditRoute={(id: number) => quotes.edit(id).url}
                />
            </div>
        </AppLayout>
    );
}
