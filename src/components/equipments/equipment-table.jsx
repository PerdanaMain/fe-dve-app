"use client";

import { useMutation } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Check, ChevronDown, MoreHorizontal } from "lucide-react";
import * as React from "react";
import {
  getEquipmentList,
  deleteEquipment,
} from "../../services/equipment.service";

import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "../../utils/env";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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

import { IconTrashXFilled } from "@tabler/icons-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import FormEquipment from "./form-equipment";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

export function DataTableEquipment() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const token = secureLocalStorage.getItem(STORAGE_KEY);

  const {
    data: equipments,
    mutate,
    isPending,
  } = useMutation({
    mutationFn: () => getEquipmentList(page, limit, token),
  });

  const { mutateAsync } = useMutation({
    mutationFn: (id) => deleteEquipment(id, token),
  });

  React.useEffect(() => {
    mutate(page, limit, token);
  }, [page, limit, token, mutate]);

  const totalPages =
    equipments && equipments.meta ? equipments.meta.totalPages : 1;
  const pageWindow = 5; // jumlah halaman yang ditampilkan
  const startPage = Math.max(1, page - Math.floor(pageWindow / 2));
  const endPage = Math.min(totalPages, startPage + pageWindow - 1);
  const rowPerPage = [2, 5, 7, 10];

  const adjustedStartPage = Math.max(1, endPage - pageWindow + 1);

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
        const equipment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <FormEquipment
                type={"edit"}
                equipmentMutate={mutate}
                equipment={equipment}
              />
              <Button variant="none" onClick={() => handleDelete(equipment)}>
                <IconTrashXFilled />
                Delete
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const data = React.useMemo(() => {
    return equipments && equipments.data ? equipments.data : [];
  }, [equipments]);

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

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePreviousPage = () => {
    setPage(page - 1);
  };
  const handleDelete = (data) => {
    Swal.fire({
      title: "Delete this equipment?",
      text: `Are you sure you want to delete ${data.hostname} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        toast.promise(
          mutateAsync(data.id, token).then((updated) => {
            mutate(token); // refresh data if needed
            return updated;
          }),
          {
            loading: "Please wait...",
            success: () =>"Equipment deleted successfully!",
            error: (err) => `${err.toString()}`,
          },
          {
            style: {
              minWidth: "250px",
            },
            success: {
              icon: "🔥",
            },
          }
        );
      }
    });
  };

  if (isPending) {
    return (
      <div className="w-full">
        <div className="flex items-center py-4">
          <div className="h-10 bg-gray-100 rounded w-1/3 animate-pulse" />
          <div className="ml-auto h-10 bg-gray-100 rounded w-32 animate-pulse" />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col.accessorKey || col.id}>
                    <div className="h-4 bg-gray-100 rounded w-24 animate-pulse" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(limit)].map((_, idx) => (
                <TableRow key={idx}>
                  {columns.map((col, cidx) => (
                    <TableCell key={cidx}>
                      <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <div className="h-8 w-20 bg-gray-100 rounded animate-pulse inline-block" />
            <div className="h-8 w-16 bg-gray-100 rounded animate-pulse inline-block" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Toaster />
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
          <div className="flex-1"></div>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="mr-1">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="mr-1">
              Row per page <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {rowPerPage.map((rowCount, index) => {
              return (
                <DropdownMenuItem
                  key={index}
                  className="capitalize cursor-pointer"
                  onClick={() => setLimit(rowCount)}
                >
                  <span className="text-xm">{rowCount}</span>
                  {limit === rowCount ? <Check /> : ""}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <FormEquipment type={"create"} equipmentMutate={mutate} />
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
        <div className="text-muted-foreground flex-1 text-sm">
          showing {data.length} of {equipments && equipments.meta.total + " "}
          equipment(s)
        </div>
        <div className="space-x-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={handlePreviousPage}
                >
                  Previous
                </Button>
              </PaginationItem>

              {/* First Page & Ellipsis */}
              {adjustedStartPage > 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => setPage(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {adjustedStartPage > 2 && <PaginationEllipsis />}
                </>
              )}

              {/* Dynamic Page Numbers */}
              {Array.from(
                { length: endPage - adjustedStartPage + 1 },
                (_, idx) => adjustedStartPage + idx
              ).map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={page === pageNumber}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {/* Last Page & Ellipsis */}
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && <PaginationEllipsis />}
                  <PaginationItem>
                    <PaginationLink onClick={() => setPage(totalPages)}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              {/* Next Button */}
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={handleNextPage}
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
