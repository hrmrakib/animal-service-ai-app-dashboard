import { ReactNode } from "react";

interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
}

export function Table<T>({ columns, data, keyExtractor }: TableProps<T>) {
  return (
    <div className='w-full overflow-x-auto rounded-xl bg-white shadow-sm'>
      <table className='w-full text-sm text-left whitespace-nowrap'>
        <thead className='bg-gray-100/50 text-gray-500 border-b border-border-subtle font-medium'>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className={`px-6 py-4 font-medium ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-border-subtle'>
          {data.map((row) => (
            <tr
              key={keyExtractor(row)}
              className='hover:bg-gray-50 transition-colors'
            >
              {columns.map((col, i) => (
                <td key={i} className={`px-6 py-4 ${col.className || ""}`}>
                  {typeof col.accessor === "function"
                    ? col.accessor(row)
                    : (row[col.accessor] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
