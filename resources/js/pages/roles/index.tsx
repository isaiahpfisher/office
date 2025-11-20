import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import AppLayout from '@/layouts/app-layout';
import characters from '@/routes/characters';
import roles from '@/routes/roles';
import { type BreadcrumbItem } from '@/types';
import { Role } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { UsersIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: roles.index().url,
    },
];

const columns: ColumnDef<Role>[] = [
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
        accessorKey: 'title',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
    },
    {
        accessorKey: 'start_date',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Start Date" />
        ),
        cell: ({ row }) =>
            new Date(row.original.start_date).toLocaleDateString(),
    },
    {
        accessorKey: 'end_date',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="End Date" />
        ),
        cell: ({ row }) => new Date(row.original.end_date).toLocaleDateString(),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={roles.edit(row.original.id).url}
                deleteRoute={roles.destroy(row.original.id).url}
            />
        ),
    },
];

export default function RolesIndex({ data }: { data: Role[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="h-full p-6">
                <DataTable
                    title="Characters"
                    description="Browse roles from the show."
                    columns={columns}
                    data={data}
                    createRoute={roles.create().url}
                    getEditRoute={(id: number) => roles.edit(id).url}
                />
            </div>
        </AppLayout>
    );
}
