import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import AppLayout from '@/layouts/app-layout';
import actors from '@/routes/actors';
import characters from '@/routes/characters';
import departments from '@/routes/departments';
import { type BreadcrumbItem } from '@/types';
import { Character } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { DramaIcon, LayersIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Characters',
        href: characters.index().url,
    },
];

const columns: ColumnDef<Character>[] = [
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
        accessorKey: 'department',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Department" />
        ),
        cell: ({ row }) => (
            <DataTableLinkCell
                icon={<LayersIcon />}
                label={`${row.original.department.title}`}
                editRoute={departments.edit(row.original.department.id).url}
            />
        ),
    },
    {
        accessorKey: 'actor',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actor" />
        ),
        cell: ({ row }) => (
            <DataTableLinkCell
                icon={<DramaIcon />}
                label={`${row.original.actor.first_name} ${row.original.actor.last_name}`}
                editRoute={actors.edit(row.original.actor.id).url}
            />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={characters.edit(row.original.id).url}
                deleteRoute={characters.destroy(row.original.id).url}
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
                    getEditRoute={(id: number) => characters.edit(id).url}
                />
            </div>
        </AppLayout>
    );
}
