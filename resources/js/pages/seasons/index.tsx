import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableCheckboxCell } from '@/components/table/checkbox-cell';
import { DataTableCheckboxHeader } from '@/components/table/checkbox-header';
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
        id: 'select',
        header: ({ table }) => <DataTableCheckboxHeader table={table} />,
        cell: ({ row }) => <DataTableCheckboxCell row={row} />,
        enableSorting: false,
        enableHiding: false,
    },
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
                editRoute={seasons.edit(parseInt(row.original.id)).url}
                deleteRoute={seasons.destroy(parseInt(row.original.id)).url}
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
                />
            </div>
        </AppLayout>
    );
}
