import React, { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, getFacetedUniqueValues } from "@tanstack/react-table";
// import Template from "../template/template";

const data = [
    { name: "John Doe", status: "pending", type: "Type A", state: "Rajasthan" },
    { name: "Jane Smith", status: "completed", type: "Type B", state: "Delhi" },
    { name: "Alice Brown", status: "in progress", type: "Type C", state: "Rajasthan" },
    { name: "Bob White", status: "hold", type: "Type A", state: "Delhi" },
];

const statusOptions = ["pending", "in progress", "hold", "completed"];

const Driver = () => {
    const [globalFilter, setGlobalFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const columns = useMemo(
        () => [
            { accessorKey: "name", header: "Name" },
            { accessorKey: "status", header: "Status" },
            { accessorKey: "type", header: "Type" },
            { accessorKey: "state", header: "State" },
        ],
        []
    );




    const filteredData = useMemo(() => {
        let filtered = data;
        if (statusFilter) {
            filtered = filtered.filter(row => row.status === statusFilter);
        }
        if (globalFilter) {
            filtered = filtered.filter(row =>
                Object.values(row).some(val =>
                    String(val).toLowerCase().includes(globalFilter.toLowerCase())
                )
            );
        }
        return filtered;
    }, [globalFilter, statusFilter]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        getFacetedUniqueValues: getFacetedUniqueValues()
    });

    const uniqueStatusValues = table.getColumn("status")?.getFacetedUniqueValues();

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <input
                    value={globalFilter}
                    onChange={e => setGlobalFilter(e.target.value)}
                    placeholder="Global Search"
                    style={{ marginRight: 8 }}
                />
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            <div className="p-4">
                <table className="min-w-full border border-gray-200 rounded-md overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="text-left text-sm font-semibold px-4 py-2 border-b border-gray-200"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr
                                key={row.id}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="text-sm text-gray-800 px-4 py-2 border-b border-gray-100"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )

    return (
        <>
            <div style={{ marginBottom: 16 }}>
                <input
                    value={globalFilter}
                    onChange={e => setGlobalFilter(e.target.value)}
                    placeholder="Global Search"
                    style={{ marginRight: 8 }}
                />
                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Driver;