import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { SprintTypes } from '@/types/sprint/sprint.types';

async function getSprints(projectId?: string): Promise<SprintTypes[]> {
    let query = supabase.from('sprints').select('*');
    if (projectId) {
        query = query
            .eq('project_id', projectId)
            .order('start_date', { ascending: false });
    }
    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
}

interface UseGetSprintsOptions {
    enabled?: boolean;
}

const useGetSprints = (
    projectId?: string,
    options: UseGetSprintsOptions = {}
) => {
    const { enabled = true } = options;
    const { data, isLoading, error } = useQuery({
        queryKey: ['sprints', projectId ?? 'all'],
        queryFn: () => getSprints(projectId),
        enabled,
    });
    return { data, isLoading, error };
};

export default useGetSprints;
