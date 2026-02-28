import type { ReactNode } from 'react';

const primaryClass =
    'flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg';
const secondaryClass =
    'px-4 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all';
const fullPrimaryClass =
    'w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg';

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
