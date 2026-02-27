'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
    redirectIfAuthedTo = '/',
}: ProtectedRouteProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [authState, setAuthState] = useState<AuthState>('loading');

    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            try {
                const {
                    data: { user },
                } = await supabase.auth.getUser();

                if (!isMounted) return;

                setAuthState(user ? 'authenticated' : 'unauthenticated');
            } catch {
                if (!isMounted) return;
                setAuthState('unauthenticated');
            }
        };

        checkAuth();

        // Also subscribe to auth changes so navigation stays in sync
        const {
            data: authListener,
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!isMounted) return;
            setAuthState(session?.user ? 'authenticated' : 'unauthenticated');
        });

        return () => {
            isMounted = false;
            authListener.subscription.unsubscribe();
        };
    }, []);

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
    }, [authState, requireAuth, redirectTo, redirectIfAuthedTo, pathname, router]);

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

