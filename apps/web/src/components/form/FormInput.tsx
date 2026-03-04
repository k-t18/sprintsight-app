import { FormLabel } from './FormLabel';
import { FormError } from './FormError';
import type { ReactNode } from 'react';

const inputBase =
    'w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-all bg-brand-base text-brand-text placeholder:text-brand-textMuted';
const inputError = 'border-red-500 focus:border-red-400 focus:ring-red-500';
const inputNormal =
    'border-brand-border focus:border-brand-accent focus:ring-brand-accent';

interface FormInputProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'className'
> {
    id: string;
    label: string;
    error?: string;
    icon?: ReactNode;
    required?: boolean;
    wrapperClassName?: string;
    className?: string;
}

export function FormInput({
    id,
    label,
    error,
    icon,
    required,
    wrapperClassName = 'mb-5',
    className = '',
    ...props
}: FormInputProps) {
    return (
        <div className={wrapperClassName}>
            <FormLabel htmlFor={id} icon={icon} required={required}>
                {label}
            </FormLabel>
            <input
                id={id}
                className={`${inputBase} ${error ? inputError : inputNormal} ${className}`}
                aria-invalid={!!error}
                {...props}
            />
            {error && <FormError message={error} />}
        </div>
    );
}
