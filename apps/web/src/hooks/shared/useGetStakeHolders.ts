import { supabase } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface Person {
    id: string;
    full_name: string;
    email: string;
    role: string;
}

async function getStakeHolders(): Promise<Person[]> {
    const { data, error } = await supabase
        .from('people')
        .select('id, full_name, email, role');
    if (error) throw error;
    return data ?? [];
}

const useGetStakeHolders = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['stake-holders'],
        queryFn: () => getStakeHolders(),
    });

    return { data: data ?? [], isLoading, error };
};

export default useGetStakeHolders;
