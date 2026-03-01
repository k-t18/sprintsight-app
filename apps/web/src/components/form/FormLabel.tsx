import { type ReactNode } from 'react';

interface FormLabelProps {
    htmlFor?: string;
    children: ReactNode;
    required?: boolean;
    icon?: ReactNode;
    className?: string;
}

export function FormLabel({
    htmlFor,
    children,
    required,
    icon,
    className = '',
}: FormLabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className={`block text-sm font-semibold text-brand-textSecondary mb-2 flex items-center gap-2 ${className}`}
        >
            {icon}
            {children}
            {required && <span className="text-red-400">*</span>}
        </label>
    );
}
