import React from "react";
import { useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  filterFns,
} from '@tanstack/react-table';

// examples
// https://hygraph.com/blog/react-table
// https://github.com/pester/docs/blob/main/src/components/PesterDataTable/PesterDataTable.js
// https://tanstack.com/table/v8/docs/guide/migrating


const SortableTable = ({ columns,
    data
  }) => {
  const [globalFilter, setGlobalFilter] = React.useState('')

  const tbl = useReactTable({
    columns, // ColumnDef<TData>[],
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    enableFilters: true,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter
    }
  });

  
  // render the UI for the table
  return (
    <>
    <input type="text" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search all columns..." />
    <button onClick={() => setGlobalFilter('')}>Clear Search</button>
    <table>
      <thead>
        {tbl.getHeaderGroups().map(hgroup => 
          (<tr key={hgroup.id}>
            {hgroup.headers.map(header => (
              <th colSpan={header.colSpan} 
                  key={header.column.id} 
                  onClick={header.column.getToggleSortingHandler()}
                  >
                {flexRender(header.column.columnDef.header, header.getContext())}
                <span>{header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? ' ▼' : ' ▲') : '-'}</span>
              </th>
            ))}
            
          </tr>
        ))}
      </thead>
      <tbody>
        {tbl.getRowModel().rows.map(row => {
          return (
            <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td>
                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  )
}

export default SortableTable;
