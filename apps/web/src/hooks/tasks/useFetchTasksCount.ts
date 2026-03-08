import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { getLoggedInUser } from '@/store/userStore';

export type TaskCounts = {
    todo: number;
    in_progress: number;
    blocked: number;
    done: number;
};

const DEFAULT_TASK_COUNTS: TaskCounts = {
    todo: 0,
    in_progress: 0,
    blocked: 0,
    done: 0,
};

async function fetchTasksCount(): Promise<TaskCounts> {
    const user = getLoggedInUser();
    if (!user?.id) return DEFAULT_TASK_COUNTS;

    const { data, error } = await supabase.functions.invoke(
        'tasks-count-list',
        {
            body: { dev_id: user.id },
        },
    );
    if (error) throw error;
    if (data && typeof data === 'object') {
        return { ...DEFAULT_TASK_COUNTS, ...data } as TaskCounts;
    }
    return DEFAULT_TASK_COUNTS;
}

const TASKS_COUNT_QUERY_KEY = ['tasks-count'];

const useFetchTasksCount = () => {
    const { data, refetch, isLoading, error } = useQuery({
        queryKey: TASKS_COUNT_QUERY_KEY,
        queryFn: fetchTasksCount,
    });
    return {
        taskCounts: data ?? DEFAULT_TASK_COUNTS,
        refetch,
        isLoading,
        error,
    };
};

export default useFetchTasksCount;
export { TASKS_COUNT_QUERY_KEY };
