'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * When Supabase sends a password reset email, the link uses the Site URL (e.g. localhost:3000)
 * and puts the token in the hash. Redirect to /reset-password so the reset form is shown.
 */
export function RecoveryRedirect() {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === 'undefined' || !window.location.hash) return;
        const hash = window.location.hash;
        const isRecovery = hash.includes('type=recovery');
        if (isRecovery && pathname !== '/reset-password') {
            window.location.replace(`/reset-password${hash}`);
        }
    }, [pathname]);

    return null;
}
