import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { getLoggedInUser } from '../shared/useGetLoggedInUser';
import { ProjectTypes } from '@/types/project/project.types';

async function fetchAssignedProjects(): Promise<ProjectTypes[]> {
    const user = await getLoggedInUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('project_members')
        .select(
            `
            project:projects (
                id,
                name,
                description,
                start_date,
                end_date,
                status,
                owner_person_id
            )
        `,
        )
        .eq('profile_id', user.id);

    if (error) throw error;
    const projects = (data ?? [])
        .flatMap((row) => (Array.isArray(row.project) ? row.project : [row.project]))
        .filter(Boolean);
    return projects as ProjectTypes[];
}

const useAssignedProjects = () => {
    const { data: projects = [] } = useQuery({
        queryKey: ['assigned-projects'],
        queryFn: fetchAssignedProjects,
    });
    return { projects };
};

export default useAssignedProjects;
