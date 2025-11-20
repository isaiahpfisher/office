import { Link } from '@inertiajs/react';
import {} from 'lucide-react';
import { Button } from '../ui/button';

interface DataTableLinkCellrops extends React.HTMLAttributes<HTMLDivElement> {
    icon: React.ReactNode;
    label: string;
    editRoute: string;
}

export function DataTableLinkCell({
    icon,
    label,
    editRoute,
}: DataTableLinkCellrops) {
    return (
        <Button
            variant={'outline'}
            size={'sm'}
            asChild
            onClick={(e) => e.stopPropagation()}
        >
            <Link href={editRoute}>
                {icon}
                {label}
            </Link>
        </Button>
    );
}
