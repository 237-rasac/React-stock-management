import { cn } from '@/lib/utils';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export const Table = ({ className, children, ...props }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className={cn('w-full caption-bottom text-sm', className)} {...props}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <thead className={cn('[&_tr]:border-b', className)} {...props}>
      {children}
    </thead>
  );
};

export const TableBody = ({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props}>
      {children}
    </tbody>
  );
};

export const TableFooter = ({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <tfoot className={cn('border-t bg-gray-50 dark:bg-gray-800/50 font-medium [&>tr]:last:border-b-0', className)} {...props}>
      {children}
    </tfoot>
  );
};

export const TableRow = ({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => {
  return (
    <tr className={cn('border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors', className)} {...props}>
      {children}
    </tr>
  );
};

export const TableHead = ({ className, children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400 [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
};

export const TableCell = ({ className, children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props}>
      {children}
    </td>
  );
};

export const TableCaption = ({ className, children, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) => {
  return (
    <caption className={cn('mt-4 text-sm text-gray-500 dark:text-gray-400', className)} {...props}>
      {children}
    </caption>
  );
};