'use client';

import { supabase } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export async function getLoggedInUser(): Promise<User | null> {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        throw error;
    }

    return user ?? null;
}
