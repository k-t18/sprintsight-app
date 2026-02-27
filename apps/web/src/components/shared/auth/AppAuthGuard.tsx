'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { ProtectedRoute } from '@/components/shared/auth/ProtectedRoute';

const PUBLIC_ONLY_ROUTES = [
    '/auth/login',
    '/auth/forgot-password',
    '/auth/reset-password',
];

export function AppAuthGuard({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isPublicOnly = PUBLIC_ONLY_ROUTES.some((route) =>
        pathname.startsWith(route),
    );

    if (isPublicOnly) {
        return (
            <ProtectedRoute requireAuth={false} redirectIfAuthedTo="/">
                {children}
            </ProtectedRoute>
        );
    }

    return <ProtectedRoute redirectTo="/auth/login">{children}</ProtectedRoute>;
}
