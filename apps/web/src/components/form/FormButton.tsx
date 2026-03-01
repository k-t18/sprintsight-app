import type { ReactNode } from 'react';

const primaryClass =
    'flex-1 px-6 py-3 bg-brand-accent hover:bg-brand-accentHover text-brand-base font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg';
const secondaryClass =
    'px-4 py-3 border-2 border-brand-border text-brand-textSecondary font-semibold rounded-lg hover:bg-brand-surfaceHover transition-all';
const fullPrimaryClass =
    'w-full px-6 py-3 bg-brand-accent hover:bg-brand-accentHover text-brand-base font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg';

interface FormButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
    children: ReactNode;
}

export function FormButton({
    variant = 'primary',
    fullWidth,
    className = '',
    children,
    ...props
}: FormButtonProps) {
    const base =
        variant === 'secondary'
            ? secondaryClass
            : fullWidth
              ? fullPrimaryClass
              : primaryClass;
    return (
        <button
            className={`${base} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
