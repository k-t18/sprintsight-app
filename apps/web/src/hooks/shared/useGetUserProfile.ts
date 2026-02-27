'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';

type UserProfile = {
    id: string;
    full_name: string | null;
    role: string | null;
};

type UseGetUserProfileResult = {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
};

async function fetchUserProfile(): Promise<UserProfile | null> {
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }

    if (!user) {
        return null;
    }

    const { data, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('id', user.id)
        .single();

    if (profileError) {
        throw profileError;
    }

    if (!data) return null;

    return {
        id: data.id,
        full_name: (data as any).full_name ?? null,
        role: (data as any).role ?? null,
    };
}

export function useGetUserProfile(): UseGetUserProfileResult {
    const {
        data,
        isLoading,
        error,
    } = useQuery<UserProfile | null, Error>({
        queryKey: ['user-profile'],
        queryFn: fetchUserProfile,
    });

    return {
        profile: data ?? null,
        loading: isLoading,
        error: error ? error.message : null,
    };
}

