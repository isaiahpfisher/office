import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import AppLayout from '@/layouts/app-layout';
import characters from '@/routes/characters';
import episodes from '@/routes/episodes';
import thingsSheSaid from '@/routes/things-she-said';
import { type BreadcrumbItem } from '@/types';
import { ThingSheSaid } from '@/types/models';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ClapperboardIcon, UsersIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Things She Said',
        href: thingsSheSaid.index().url,
    },
];

const columns: ColumnDef<ThingSheSaid>[] = [
    {
        accessorKey: 'saying',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Saying" />
        ),
        cell: ({ row }) => (
            <div className="line-clamp-2 max-w-lg text-wrap">
                {row.original.saying}
            </div>
        ),
    },
    {
        accessorKey: 'episode',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Episode" />
        ),
        cell: ({ row }) => (
            <DataTableLinkCell
                label={`${row.original.episode.title}`}
                editRoute={episodes.edit(row.original.episode.id).url}
                icon={<ClapperboardIcon />}
            />
        ),
    },
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
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={thingsSheSaid.edit(row.original.id).url}
                deleteRoute={thingsSheSaid.destroy(row.original.id).url}
            />
        ),
    },
];

export default function ThingsSheSaidIndex({ data }: { data: ThingSheSaid[] }) {
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Things She Said" />
                <div className="h-full p-6">
                    <DataTable
                        title="Things She Said"
                        description="Browse things she said from the show."
                        columns={columns}
                        data={data}
                        createRoute={thingsSheSaid.create().url}
                        getEditRoute={(id: number) =>
                            thingsSheSaid.edit(id).url
                        }
                        blur={true}
                    />
                </div>
            </AppLayout>
        </>
    );
}
