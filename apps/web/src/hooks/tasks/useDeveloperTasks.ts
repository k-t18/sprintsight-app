import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { getLoggedInUser } from '@/store/userStore';

async function getDeveloperTasks() {
    const user = getLoggedInUser();
    if (!user?.id) return [];

    const { data, error } = await supabase.functions.invoke('tasks-count', {
        body: { dev_id: user.id },
    });
    if (error) throw error;
    return (data?.tasks ?? []) as DeveloperTask[];
}

export type DeveloperTask = {
    id: string;
    title: string;
    status: string;
    project_id: string;
    created_by: string;
    projects?: { id: string; name?: string; status?: string };
};

export const DEVELOPER_TASKS_QUERY_KEY = ['developer-tasks'];

const useDeveloperTasks = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: DEVELOPER_TASKS_QUERY_KEY,
        queryFn: () => getDeveloperTasks(),
    });
    return { data, isLoading, error, refetch };
};

export default useDeveloperTasks;
