import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { ProjectTypes } from '@/types/project/project.types';

async function getProjects(): Promise<ProjectTypes[]> {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) throw error;
    return data ?? [];
}

const useGetProjects = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['projects'],
        queryFn: () => getProjects(),
    });
    return { data, isLoading, error };
};

export default useGetProjects;
