import { ColumnDef } from '@tanstack/react-table';

import { DataTableActionsCell } from '@/components/table/actions-cell';
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
        accessorKey: 'title',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={departments.edit(row.original.id).url}
                deleteRoute={departments.destroy(row.original.id).url}
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
                    getEditRoute={(id: number) => departments.edit(id).url}
                />
            </div>
        </AppLayout>
    );
}
