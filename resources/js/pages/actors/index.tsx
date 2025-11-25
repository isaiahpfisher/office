import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import AppLayout from '@/layouts/app-layout';
import actors from '@/routes/actors';
import characters from '@/routes/characters';
import { type BreadcrumbItem } from '@/types';
import { Actor } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { UsersIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Actors',
        href: actors.index().url,
    },
];

const columns: ColumnDef<Actor>[] = [
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
        accessorKey: 'characters',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Character" />
        ),
        cell: ({ row }) => {
            if (row.original.characters.length === 0) return 'N/A';
            const character = `${row.original.characters[0].first_name} ${row.original.characters[0].last_name}`;
            return;
            <DataTableLinkCell
                icon={<UsersIcon />}
                label={character}
                editRoute={characters.edit(row.original.characters[0].id).url}
            />;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={actors.edit(row.original.id).url}
                deleteRoute={actors.destroy(row.original.id).url}
            />
        ),
    },
];

export default function ActorsIndex({ data }: { data: Actor[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Actors" />
            <div className="h-full p-6">
                <DataTable
                    title="Actors"
                    description="Browse actors from the show."
                    columns={columns}
                    data={data}
                    createRoute={actors.create().url}
                    getEditRoute={(id: number) => actors.edit(id).url}
                />
            </div>
        </AppLayout>
    );
}
