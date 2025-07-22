"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const data = [
  {
    id: "c1fabd1a-ae33-4bb2-b625-990988313473",
    hostname: "SERVER-XL0701-PS-1701",
    brand: "CISCO",
    type: "RXXX Type B 17",
    serialnumber: "XXX-017-01",
    function: "SWITCH",
    category: "FIREWALL",
    group: "IT",
    createdAt: "2025-07-22T07:11:28.134Z",
    updatedAt: "2025-07-22T07:11:28.134Z",
    maintenances: [],
  },
  {
    id: "09071fba-a507-4f8e-9fa0-1053d8270c25",
    hostname: "FIREWALL-XL07-PS-87",
    brand: "DELLEMC",
    type: "RXXX Type B 87",
    serialnumber: "XXX-087",
    function: "FIREWALL",
    category: "FIREWALL",
    group: "IN",
    createdAt: "2025-07-22T04:48:25.138Z",
    updatedAt: "2025-07-22T04:48:25.138Z",
    maintenances: [],
  },
  {
    id: "0939f44f-ba90-49ca-8d57-5b869210dfa5",
    hostname: "DISCOVERY-XL07-PS-79",
    brand: "DELLEMC",
    type: "RXXX Type B 79",
    serialnumber: "XXX-079",
    function: "DISCOVERY",
    category: "DISCOVERY",
    group: "CORE",
    createdAt: "2025-07-22T04:48:25.138Z",
    updatedAt: "2025-07-22T04:48:25.138Z",
    maintenances: [],
  },
];

export function DataTableEquipment() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = [
    {
      accessorKey: "hostname",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="-ml-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Hostname
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("hostname")}</div>
      ),
    },
    {
      accessorKey: "serialnumber",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="-ml-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Serial Number
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("serialnumber")}</div>
      ),
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("brand")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "function",
      header: "Function",
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("function")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("category")}</div>
      ),
    },
    {
      accessorKey: "group",
      header: "Group",
      cell: ({ row }) => (
        <div className="uppercase">{row.getValue("group")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter hostname..."
          value={table.getColumn("hostname")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("hostname")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
                  );
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
  );
}
