import { DataTableActionsCell } from '@/components/table/actions-cell';
import { DataTableColumnHeader } from '@/components/table/column-header';
import { DataTable } from '@/components/table/data-table';
import { DataTableLinkCell } from '@/components/table/link-cell';
import coldOpens from '@/routes/cold-opens';
import episodeRoutes from '@/routes/episodes';
import seasons from '@/routes/seasons';
import { Episode } from '@/types/models';
import { ColumnDef } from '@tanstack/react-table';
import { FilmIcon, PopcornIcon } from 'lucide-react';

const columns: ColumnDef<Episode>[] = [
    {
        accessorKey: 'air_date',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Air Date" />
        ),
        cell: ({ row }) => new Date(row.original.air_date).toLocaleDateString(),
    },
    {
        accessorKey: 'title',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
    },
    {
        accessorKey: 'summary',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Summary" />
        ),
        cell: ({ row }) => (
            <div className="line-clamp-2 max-w-lg text-wrap">
                {row.original.summary}
            </div>
        ),
    },
    {
        accessorKey: 'season',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Season" />
        ),
        cell: ({ row }) => (
            <DataTableLinkCell
                icon={<FilmIcon />}
                label={`#${row.original.season.number}`}
                editRoute={seasons.edit(row.original.season.id).url}
            />
        ),
    },
    {
        accessorKey: 'cold_open',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Cold Open" />
        ),
        cell: ({ row }) =>
            row.original.cold_open ? (
                <DataTableLinkCell
                    icon={<PopcornIcon />}
                    label={`Cold Open`}
                    editRoute={coldOpens.edit(row.original.cold_open.id).url}
                />
            ) : (
                <div className="text-muted-foreground">N/A</div>
            ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableActionsCell
                editRoute={episodeRoutes.edit(row.original.id).url}
                deleteRoute={episodeRoutes.destroy(row.original.id).url}
            />
        ),
    },
];

export default function SeasonsEpisodes({ episodes }: { episodes: Episode[] }) {
    return (
        <>
            <DataTable
                columns={columns}
                data={episodes}
                createRoute={episodeRoutes.create().url}
                getEditRoute={(id: number) => episodeRoutes.edit(id).url}
            />
        </>
    );
}
