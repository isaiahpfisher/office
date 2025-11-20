import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import AppLayout from '@/layouts/app-layout';
import seasons from '@/routes/seasons';
import { type BreadcrumbItem } from '@/types';
import { Season } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Seasons',
        href: seasons.index().url,
    },
];

const columns: ColumnDef<Season>[] = [
    {
        accessorKey: 'number',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Season #" />
        ),
    },
    {
        accessorKey: 'start_date',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Start Date" />
        ),
    },
    {
        accessorKey: 'end_date',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="End Date" />
        ),
    },
    {
        accessorKey: 'overview',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Overview" />
        ),
        cell: ({ row }) => (
            <div className="max-w-2xl truncate">{row.original.overview}</div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={seasons.edit(row.original.id).url}
                deleteRoute={seasons.destroy(row.original.id).url}
            />
        ),
    },
];

export default function seasonsIndex({ data }: { data: Season[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Seasons" />
            <div className="h-full p-6">
                <DataTable
                    title="Seasons"
                    description="Browse seasons from the show."
                    columns={columns}
                    data={data}
                    createRoute={seasons.create().url}
                    getEditRoute={(id: number) => seasons.edit(id).url}
                />
            </div>
        </AppLayout>
    );
}
