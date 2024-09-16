import { useState } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import {
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input';

import { storeTable } from '@/types/analysisTypes';

export default function Analysis() {

    const stores = useSelector((state: RootState) => state.stores.stores);


    const [data, setData] = useState<storeTable[]>(stores)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    // Anzahl der Einträge pro Seite
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })





    const columns: ColumnDef<storeTable>[] = [
        {
            accessorKey: "storeNumber",
            header: ({ column }) => {
                return (
                    <Button
                        variant="secondary"

                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className='text-white bg-transparent'
                    >
                        Store Number
                        <ArrowUpDown className=" ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className='pl-4'>{row.getValue("storeNumber")}</div>,
        },
        {
            accessorKey: "city",
            header: ({ column }) => {
                return (
                    <Button
                        variant="secondary"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className='text-white bg-transparent'
                    >
                        City
                        <ArrowUpDown className=" ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className='pl-4'>{row.getValue("city")}</div>,
        },
        {
            accessorKey: "sections",
            header: ({ column }) => {
                return (
                    <Button
                        variant="secondary"
                        className='text-white bg-transparent'
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Sections
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className='pl-4'>{row.getValue("sections")}</div>,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const store = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="bg-secondary h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='bg-secondary' align="end">
                            <DropdownMenuLabel className='text-white'>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(store.storeNumber)}
                                className='text-white cursor-pointer'
                            >
                                Copy store number
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => window.open(`https://www.mueller.de/meine-filiale/${getLinkByStoreNumber(store.storeNumber)}`, "_blank")}
                                className='text-white cursor-pointer'>View store details</DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            pagination,
            columnVisibility,
            rowSelection,
        },
        onPaginationChange: setPagination
    })

    // Link muss seperat abgefragt werden wegen DataTable Architektur ..    
    const getLinkByStoreNumber = (storeNumber: string) => {
        const storeWithLink = stores.find(
            (store) => storeNumber === store.storeNumber
        )
        if (storeWithLink?.link) {
            console.log(storeWithLink.link);
            return storeWithLink.link
        }
    }



    return (
        <div className="w-full flex flex-col gap-3">

            <div className='flex gap-4'>
                <Input
                    placeholder="Filter Store Number..."
                    value={(table.getColumn("storeNumber")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("storeNumber")?.setFilterValue(event.target.value)
                    }
                    className="w-52"
                />

                <Input
                    placeholder="Filter City..."
                    value={(table.getColumn("city")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("city")?.setFilterValue(event.target.value)
                    }
                    className="w-52"
                />



            </div>


            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}


