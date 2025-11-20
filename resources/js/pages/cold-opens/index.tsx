import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import AppLayout from '@/layouts/app-layout';
import characters from '@/routes/characters';
import coldOpens from '@/routes/cold-opens';
import { type BreadcrumbItem } from '@/types';
import { ColdOpen } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ClapperboardIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cold Opens',
        href: coldOpens.index().url,
    },
];

const columns: ColumnDef<ColdOpen>[] = [
    {
        accessorKey: 'description',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => (
            <div className="line-clamp-2 max-w-lg text-wrap">
                {row.original.description}
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
                editRoute={characters.edit(row.original.episode.id).url}
                icon={<ClapperboardIcon />}
            />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={coldOpens.edit(row.original.id).url}
                deleteRoute={coldOpens.destroy(row.original.id).url}
            />
        ),
    },
];

export default function ColdOpensIndex({ data }: { data: ColdOpen[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cold Opens" />
            <div className="h-full p-6">
                <DataTable
                    title="Cold Opens"
                    description="Browse cold opens from the show."
                    columns={columns}
                    data={data}
                    createRoute={coldOpens.create().url}
                    getEditRoute={(id: number) => coldOpens.edit(id).url}
                />
            </div>
        </AppLayout>
    );
}
