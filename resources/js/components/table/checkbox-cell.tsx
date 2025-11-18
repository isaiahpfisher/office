import { Checkbox } from '@/components/ui/checkbox';
import { Row } from '@tanstack/react-table';

interface DataTableCheckboxCellProps<TData>
    extends React.HTMLAttributes<HTMLDivElement> {
    row: Row<TData>;
}

export function DataTableCheckboxCell<TData>({
    row,
}: DataTableCheckboxCellProps<TData>) {
    return (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
    );
}
