import { Checkbox } from '@/components/ui/checkbox';
import { Table } from '@tanstack/react-table';

interface DataTableCheckboxHeaderProps<TData>
    extends React.HTMLAttributes<HTMLDivElement> {
    table: Table<TData>;
}

export function DataTableCheckboxHeader<TData>({
    table,
}: DataTableCheckboxHeaderProps<TData>) {
    return (
        <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
        />
    );
}
