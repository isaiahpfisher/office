import { ColumnDef } from '@tanstack/react-table';

import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableCheckboxCell } from '@/components/table/checkbox-cell';
import { DataTableCheckboxHeader } from '@/components/table/checkbox-header';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import AppLayout from '@/layouts/app-layout';
import departments from '@/routes/departments';
import { type BreadcrumbItem } from '@/types';
import { Department } from '@/types/models';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Departments',
        href: departments.index().url,
    },
];

const columns: ColumnDef<Department>[] = [
    {
        id: 'select',
        header: ({ table }) => <DataTableCheckboxHeader table={table} />,
        cell: ({ row }) => <DataTableCheckboxCell row={row} />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'title',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={departments.edit(parseInt(row.original.id)).url}
                deleteRoute={departments.destroy(parseInt(row.original.id)).url}
            />
        ),
    },
];

export default function DepartmentsIndex({ data }: { data: Department[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Departments" />
            <div className="h-full p-6">
                <DataTable
                    title="Departments"
                    description="Browse departments from the show."
                    columns={columns}
                    data={data}
                    createRoute={departments.create().url}
                    getEditRoute={(id: string) =>
                        departments.edit(parseInt(id)).url
                    }
                />
            </div>
        </AppLayout>
    );
}
