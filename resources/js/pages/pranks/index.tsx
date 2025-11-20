import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import AppLayout from '@/layouts/app-layout';
import characters from '@/routes/characters';
import pranks from '@/routes/pranks';
import { type BreadcrumbItem } from '@/types';
import { Prank } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ClapperboardIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pranks',
        href: pranks.index().url,
    },
];

const columns: ColumnDef<Prank>[] = [
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
                editRoute={pranks.edit(row.original.id).url}
                deleteRoute={pranks.destroy(row.original.id).url}
            />
        ),
    },
];

export default function PranksIndex({ data }: { data: Prank[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pranks" />
            <div className="h-full p-6">
                <DataTable
                    title="Pranks"
                    description="Browse pranks from the show."
                    columns={columns}
                    data={data}
                    createRoute={pranks.create().url}
                    getEditRoute={(id: number) => pranks.edit(id).url}
                />
            </div>
        </AppLayout>
    );
}
