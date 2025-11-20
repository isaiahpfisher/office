import { DataTableColumnHeader } from '@/components/table/column-header';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

export type Payment = {
    id: string;
    amount: number;
    status: 'pending' | 'processing' | 'success' | 'failed';
    email: string;
};

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
    },
    {
        accessorKey: 'amount',
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'));
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount);

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="size-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(payment.id)
                                }
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>
                                View payment details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

export const payments: Payment[] = [
    {
        id: '728ed52f',
        amount: 100,
        status: 'pending',
        email: 'm@example.com',
    },
    {
        id: '489e1d42',
        amount: 125,
        status: 'processing',
        email: 'example@gmail.com',
    },
    {
        id: '9f6e9b30',
        amount: 200,
        status: 'success',
        email: 'john.doe@example.com',
    },
    {
        id: 'ae70b77f',
        amount: 75,
        status: 'failed',
        email: 'alice.smith@example.com',
    },
    {
        id: '34ed9a1a',
        amount: 50,
        status: 'pending',
        email: 'bob.jones@example.com',
    },
    {
        id: '3f1e12c8',
        amount: 300,
        status: 'processing',
        email: 'charlie.brown@example.com',
    },
    {
        id: 'd8a7cfd2',
        amount: 150,
        status: 'success',
        email: 'david.lee@example.com',
    },
    {
        id: '0c9b22ff',
        amount: 120,
        status: 'failed',
        email: 'emma.davis@example.com',
    },
    {
        id: '1f3a781c',
        amount: 250,
        status: 'success',
        email: 'frank.martin@example.com',
    },
    {
        id: 'f467ab8e',
        amount: 75,
        status: 'pending',
        email: 'grace.harris@example.com',
    },
    {
        id: 'ab47d2f9',
        amount: 500,
        status: 'processing',
        email: 'helen.jones@example.com',
    },
    {
        id: 'b39fc864',
        amount: 90,
        status: 'success',
        email: 'isabella.wood@example.com',
    },
    {
        id: '8d712a16',
        amount: 60,
        status: 'pending',
        email: 'jackson.scott@example.com',
    },
    {
        id: '2073dffb',
        amount: 110,
        status: 'failed',
        email: 'katherine.green@example.com',
    },
    {
        id: '9d52f310',
        amount: 180,
        status: 'processing',
        email: 'liam.turner@example.com',
    },
    {
        id: 'dbf8a23e',
        amount: 130,
        status: 'success',
        email: 'mason.perez@example.com',
    },
    {
        id: '63b6fc2a',
        amount: 220,
        status: 'pending',
        email: 'nina.white@example.com',
    },
    {
        id: 'b04d28f1',
        amount: 160,
        status: 'failed',
        email: 'olivia.mitchell@example.com',
    },
    {
        id: 'e9b5d59c',
        amount: 240,
        status: 'processing',
        email: 'patrick.williams@example.com',
    },
    {
        id: 'b67852a3',
        amount: 80,
        status: 'success',
        email: 'quincy.james@example.com',
    },
    {
        id: 'd302ca55',
        amount: 95,
        status: 'pending',
        email: 'rachel.morris@example.com',
    },
    {
        id: 'e47c3e89',
        amount: 180,
        status: 'success',
        email: 'sarah.rodriguez@example.com',
    },
    {
        id: 'a2b9ed91',
        amount: 300,
        status: 'failed',
        email: 'thomas.baker@example.com',
    },
    {
        id: '56c8db6f',
        amount: 400,
        status: 'processing',
        email: 'ursula.ryan@example.com',
    },
    {
        id: '72acda0d',
        amount: 130,
        status: 'success',
        email: 'victor.brown@example.com',
    },
    {
        id: 'c8a81e39',
        amount: 210,
        status: 'pending',
        email: 'william.clark@example.com',
    },
    {
        id: 'ab6f8f44',
        amount: 50,
        status: 'failed',
        email: 'xena.carter@example.com',
    },
    {
        id: '3e56e083',
        amount: 90,
        status: 'processing',
        email: 'yara.evans@example.com',
    },
];
