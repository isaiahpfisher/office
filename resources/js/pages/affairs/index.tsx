import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import AppLayout from '@/layouts/app-layout';
import affairs from '@/routes/affairs';
import relationships from '@/routes/relationships';
import { type BreadcrumbItem } from '@/types';
import { Affair } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { HeartHandshakeIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Affairs',
        href: affairs.index().url,
    },
];

const columns: ColumnDef<Affair>[] = [
    {
        accessorKey: 'cheating',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Cheating Relationship"
            />
        ),
        cell: ({ row }) => (
            <DataTableLinkCell
                label={`${row.original.cheating.person_one.first_name} and ${row.original.cheating.person_two.first_name}`}
                editRoute={relationships.edit(row.original.cheating.id).url}
                icon={<HeartHandshakeIcon />}
            />
        ),
    },
    {
        accessorKey: 'cheated',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Cheated Relationship"
            />
        ),
        cell: ({ row }) => (
            <DataTableLinkCell
                label={`${row.original.cheated.person_one.first_name} and ${row.original.cheated.person_two.first_name}`}
                editRoute={relationships.edit(row.original.cheated.id).url}
                icon={<HeartHandshakeIcon />}
            />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={affairs.edit(row.original.id).url}
                deleteRoute={affairs.destroy(row.original.id).url}
            />
        ),
    },
];

export default function AffairsIndex({ data }: { data: Affair[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Affairs" />
            <div className="h-full p-6">
                <DataTable
                    title="Affairs"
                    description="Browse affairs from the show."
                    columns={columns}
                    data={data}
                    createRoute={affairs.create().url}
                    getEditRoute={(id: number) => affairs.edit(id).url}
                />
            </div>
        </AppLayout>
    );
}
