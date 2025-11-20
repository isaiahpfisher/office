import { ColumnDef } from '@tanstack/react-table';

import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import AppLayout from '@/layouts/app-layout';
import branches from '@/routes/branches';
import { type BreadcrumbItem } from '@/types';
import { Branch } from '@/types/models';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Branches',
        href: branches.index().url,
    },
];

const columns: ColumnDef<Branch>[] = [
    {
        accessorKey: 'city',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="City" />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={branches.edit(row.original.id).url}
                deleteRoute={branches.destroy(row.original.id).url}
            />
        ),
    },
];

export default function BranchesIndex({ data }: { data: Branch[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Branches" />
            <div className="h-full p-6">
                <DataTable
                    title="Branches"
                    description="Browse branches from the show."
                    columns={columns}
                    data={data}
                    createRoute={branches.create().url}
                    getEditRoute={(id: number) => branches.edit(id).url}
                />
            </div>
        </AppLayout>
    );
}
