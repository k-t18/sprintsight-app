import { supabase } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { UserProfileTypes } from '@/types/user/userProfile.types';

async function getUsers(): Promise<UserProfileTypes[]> {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) throw error;
    return data as UserProfileTypes[];
}

const useGetAllUsers = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['all-users'],
        queryFn: () => getUsers(),
    });
    return { data, isLoading, error };
};

export default useGetAllUsers;
