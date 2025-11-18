import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import { EditIcon, MoreHorizontal, Trash2Icon } from 'lucide-react';
import { Button } from '../ui/button';

interface DataTableCheckActionsrops
    extends React.HTMLAttributes<HTMLDivElement> {
    editRoute: string;
    deleteRoute: string;
}

export function DataTableActionsCell({
    editRoute,
    deleteRoute,
}: DataTableCheckActionsrops) {
    return (
        <div className="flex justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href={editRoute}>
                            <EditIcon />
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-destructive-foreground hover:!text-destructive-foreground"
                        asChild
                    >
                        <Link href={deleteRoute} method="delete">
                            <Trash2Icon className="text-destructive-foreground" />
                            Delete
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
