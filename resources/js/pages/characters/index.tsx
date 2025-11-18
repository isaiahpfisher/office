import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableCheckboxCell } from '@/components/table/checkbox-cell';
import { DataTableCheckboxHeader } from '@/components/table/checkbox-header';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import AppLayout from '@/layouts/app-layout';
import characters from '@/routes/characters';
import { type BreadcrumbItem } from '@/types';
import { Character } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Characters',
        href: characters.index().url,
    },
];

const columns: ColumnDef<Character>[] = [
    {
        id: 'select',
        header: ({ table }) => <DataTableCheckboxHeader table={table} />,
        cell: ({ row }) => <DataTableCheckboxCell row={row} />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'first_name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="First Name" />
        ),
    },
    {
        accessorKey: 'last_name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Last Name" />
        ),
    },
    {
        accessorKey: 'sex',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Sex" />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={characters.edit(parseInt(row.original.id)).url}
                deleteRoute={characters.destroy(parseInt(row.original.id)).url}
            />
        ),
    },
];

export default function CharactersIndex({ data }: { data: Character[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Characters" />
            <div className="h-full p-6">
                <DataTable
                    title="Characters"
                    description="Browse characters from the show."
                    columns={columns}
                    data={data}
                    createRoute={characters.create().url}
                />
            </div>
        </AppLayout>
    );
}
