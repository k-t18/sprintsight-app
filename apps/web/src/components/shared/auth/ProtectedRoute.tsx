'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';

type ProtectedRouteProps = {
    children: ReactNode;
    /**
     * When true, only allow authenticated users.
     * When false, treat as a "public-only" route (e.g. login) and
     * redirect authenticated users away.
     */
    requireAuth?: boolean;
    /**
     * Where to send unauthenticated users when requireAuth is true.
     */
    redirectTo?: string;
    /**
     * Where to send authenticated users when requireAuth is false.
     */
    redirectIfAuthedTo?: string;
};

type AuthState = 'loading' | 'authenticated' | 'unauthenticated';

export function ProtectedRoute({
    children,
    requireAuth = true,
    redirectTo = '/auth/login',
    redirectIfAuthedTo = '/dashboard',
}: ProtectedRouteProps) {
    const router = useRouter();
    const pathname = usePathname();
    const queryClient = useQueryClient();

    const {
        data: user,
        isLoading,
    } = useQuery({
        queryKey: ['auth-user'],
        queryFn: async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            return user ?? null;
        },
    });

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                queryClient.setQueryData(['auth-user'], session?.user ?? null);
            },
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [queryClient]);

    const authState: AuthState = isLoading
        ? 'loading'
        : user
          ? 'authenticated'
          : 'unauthenticated';

    useEffect(() => {
        if (authState === 'loading') return;

        if (requireAuth && authState === 'unauthenticated') {
            if (pathname !== redirectTo) {
                router.replace(redirectTo);
            }
            return;
        }

        if (!requireAuth && authState === 'authenticated') {
            if (pathname !== redirectIfAuthedTo) {
                router.replace(redirectIfAuthedTo);
            }
        }
    }, [
        authState,
        requireAuth,
        redirectTo,
        redirectIfAuthedTo,
        pathname,
        router,
    ]);

    // While we don't know auth state, or while we're about to redirect,
    // avoid rendering the protected content to prevent flicker.
    if (authState === 'loading') {
        return null;
    }

    if (requireAuth && authState === 'unauthenticated') {
        return null;
    }

    if (!requireAuth && authState === 'authenticated') {
        return null;
    }

    return <>{children}</>;
}
