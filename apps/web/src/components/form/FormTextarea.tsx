import { FormLabel } from './FormLabel';
import { FormError } from './FormError';
import type { ReactNode } from 'react';

const textareaBase =
    'w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-all resize-none bg-brand-base text-brand-text placeholder:text-brand-textMuted';
const textareaError = 'border-red-500 focus:border-red-400 focus:ring-red-500';
const textareaNormal =
    'border-brand-border focus:border-brand-accent focus:ring-brand-accent';

interface FormTextareaProps extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
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

export function FormTextarea({
    id,
    label,
    error,
    icon,
    required,
    wrapperClassName = 'mb-5',
    className = '',
    ...props
}: FormTextareaProps) {
    return (
        <div className={wrapperClassName}>
            <FormLabel htmlFor={id} icon={icon} required={required}>
                {label}
            </FormLabel>
            <textarea
                id={id}
                className={`${textareaBase} ${error ? textareaError : textareaNormal} ${className}`}
                aria-invalid={!!error}
                {...props}
            />
            {error && <FormError message={error} />}
        </div>
    );
}
