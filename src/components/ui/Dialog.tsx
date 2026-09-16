import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Dialog = ({ open, onOpenChange, title, description, children, className }: DialogProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        ref={contentRef}
        className={cn(
          'relative w-full max-w-lg rounded-xl bg-white dark:bg-gray-800 shadow-xl animate-slide-up',
          className
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'dialog-title' : undefined}
        aria-describedby={description ? 'dialog-description' : undefined}
      >
        {(title || description) && (
          <div className="flex items-start gap-4 p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-1">
              {title && <h2 id="dialog-title" className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>}
              {description && <p id="dialog-description" className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
};

interface DialogTriggerProps {
  children: React.ReactElement;
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogTrigger = ({ children }: DialogTriggerProps) => {
  return children;
};

export const DialogContent = ({ children, className }: DialogContentProps) => {
  return <div className={cn('p-6', className)}>{children}</div>;
};

export const DialogHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('flex flex-col space-y-2', className)}>{children}</div>;
};

export const DialogTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <h2 className={cn('text-lg font-semibold text-gray-900 dark:text-white', className)}>{children}</h2>;
};

export const DialogDescription = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <p className={cn('text-sm text-gray-500 dark:text-gray-400', className)}>{children}</p>;
};

export const DialogFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('flex items-center justify-end gap-2 mt-4', className)}>{children}</div>;
};