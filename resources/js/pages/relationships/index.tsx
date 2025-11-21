import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import AppLayout from '@/layouts/app-layout';
import characters from '@/routes/characters';
import episodes from '@/routes/episodes';
import relationships from '@/routes/relationships';
import { type BreadcrumbItem } from '@/types';
import { Relationship } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { UsersIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Relationships',
        href: relationships.index().url,
    },
];

const columns: ColumnDef<Relationship>[] = [
    {
        accessorKey: 'person_one',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Person One" />
        ),
        cell: ({ row }) => (
            <DataTableLinkCell
                label={`${row.original.person_one.first_name} ${row.original.person_one.last_name}`}
                editRoute={episodes.edit(row.original.person_one.id).url}
                icon={<UsersIcon />}
            />
        ),
    },
    {
        accessorKey: 'person_two',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Person Two" />
        ),
        cell: ({ row }) => (
            <DataTableLinkCell
                label={`${row.original.person_two.first_name} ${row.original.person_two.last_name}`}
                editRoute={characters.edit(row.original.person_two.id).url}
                icon={<UsersIcon />}
            />
        ),
    },
    {
        accessorKey: 'outcome',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Outcome" />
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={relationships.edit(row.original.id).url}
                deleteRoute={relationships.destroy(row.original.id).url}
            />
        ),
    },
];

export default function RelationshipsIndex({ data }: { data: Relationship[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Relationships" />
            <div className="h-full p-6">
                <DataTable
                    title="Relationships"
                    description="Browse relationships from the show."
                    columns={columns}
                    data={data}
                    createRoute={relationships.create().url}
                    getEditRoute={(id: number) => relationships.edit(id).url}
                />
            </div>
        </AppLayout>
    );
}
