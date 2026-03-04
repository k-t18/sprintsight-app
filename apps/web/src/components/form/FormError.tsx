interface FormErrorProps {
    message: string;
    className?: string;
}

export function FormError({ message, className = '' }: FormErrorProps) {
    return (
        <p className={`text-red-400 text-sm mt-1 ${className}`}>{message}</p>
    );
}
