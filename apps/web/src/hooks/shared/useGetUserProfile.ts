'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { UserProfileTypes } from '@/types/user/userProfile.types';
import { getLoggedInUser } from './useGetLoggedInUser';

type UseGetUserProfileResult = {
    profile: UserProfileTypes | null;
    loading: boolean;
    error: string | null;
};

async function fetchUserProfile(): Promise<UserProfileTypes | null> {
    const user = await getLoggedInUser();

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
    const { data, isLoading, error } = useQuery<UserProfileTypes | null, Error>(
        {
            queryKey: ['user-profile'],
            queryFn: fetchUserProfile,
        },
    );

    return {
        profile: data ?? null,
        loading: isLoading,
        error: error ? error.message : null,
    };
}
