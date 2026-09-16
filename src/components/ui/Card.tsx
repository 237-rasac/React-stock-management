import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={cn('rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3 className={cn('text-lg font-semibold text-gray-900 dark:text-white', className)} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={cn('text-sm text-gray-500 dark:text-gray-400 mt-1', className)} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn('px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center', className)} {...props}>
      {children}
    </div>
  );
};