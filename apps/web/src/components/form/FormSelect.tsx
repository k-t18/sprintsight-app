import { FormLabel } from './FormLabel';
import { FormError } from './FormError';
import type { ReactNode } from 'react';

const selectBase =
    'w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-all bg-white text-slate-900 placeholder:text-slate-500 [&_option]:bg-white [&_option]:text-slate-900';
const selectError =
    'border-red-500 focus:border-red-600 focus:ring-red-500';
const selectNormal =
    'border-slate-300 focus:border-blue-500 focus:ring-blue-500';

export interface SelectOption {
    value: string;
    label: string;
}

interface FormSelectProps
    extends Omit<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        'className'
    > {
    id: string;
    label: string;
    error?: string;
    icon?: ReactNode;
    required?: boolean;
    options: SelectOption[];
    placeholder?: string;
    wrapperClassName?: string;
}

export function FormSelect({
    id,
    label,
    error,
    icon,
    required,
    options,
    placeholder,
    wrapperClassName = 'mb-5',
    className = '',
    ...props
}: FormSelectProps) {
    return (
        <div className={wrapperClassName}>
            <FormLabel htmlFor={id} icon={icon} required={required}>
                {label}
            </FormLabel>
            <select
                id={id}
                className={`${selectBase} ${error ? selectError : selectNormal} ${className}`}
                aria-invalid={!!error}
                {...props}
            >
                {placeholder && (
                    <option value="">{placeholder}</option>
                )}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <FormError message={error} />}
        </div>
    );
}
