/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  Table as TableProvider,
  TableRow,
} from '@/components/ui/table';
import * as _ from 'lodash';
import React from 'react';

export interface IColumn {
  label: string;
  id: string;
  className?: string;
  getFn?: (row: any) => React.ReactNode;
}

interface TableProps {
  data: any[];
  columns: IColumn[];
}
export function Table({ data, columns }: TableProps) {
  return (
    <TableProvider>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column?.id} className={column?.className}>
              {column?.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={_.uniqueId()}>
            {columns.map((column) => (
              <TableCell key={column?.id}>
                {column?.getFn ? column?.getFn(item) : item[column?.id]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableProvider>
  );
}
