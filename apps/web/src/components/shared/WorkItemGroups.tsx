'use client';

import React, { useMemo } from 'react';
import WorkItemGroup from './WorkItemGroup';
import type { DeveloperTask } from '@/hooks/tasks/useDeveloperTasks';

const STATUS_ORDER = [
    'in_progress',
    'todo',
    'blocked',
    'backlog',
    'done',
] as const;

type WorkItemGroupsProps = {
    tasks: DeveloperTask[];
    onAddTask?: (statusKey: string) => void;
};

export default function WorkItemGroups({ tasks, onAddTask }: WorkItemGroupsProps) {
    const byStatus = useMemo(() => {
        const map: Record<string, DeveloperTask[]> = {};
        for (const status of STATUS_ORDER) {
            map[status] = [];
        }
        for (const task of tasks) {
            const key = (task.status ?? 'todo').toLowerCase().replace(' ', '_');
            if (!map[key]) map[key] = [];
            map[key].push(task);
        }
        return map;
    }, [tasks]);

    const ordered = useMemo(() => {
        const result: { key: string; tasks: DeveloperTask[] }[] = [];
        for (const key of STATUS_ORDER) {
            const list = byStatus[key];
            if (list?.length) result.push({ key, tasks: list });
        }
        for (const key of Object.keys(byStatus)) {
            if (STATUS_ORDER.includes(key as any)) continue;
            const list = byStatus[key];
            if (list?.length) result.push({ key, tasks: list });
        }
        return result;
    }, [byStatus]);

    if (tasks.length === 0) {
        return (
            <div className="rounded-xl border border-brand-border bg-brand-surface p-12 text-center text-brand-textSecondary">
                No tasks to show
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-brand-border bg-brand-surface overflow-hidden">
            {ordered.map(({ key, tasks: groupTasks }) => (
                <WorkItemGroup
                    key={key}
                    statusKey={key}
                    tasks={groupTasks}
                    onAddTask={onAddTask}
                />
            ))}
        </div>
    );
}
