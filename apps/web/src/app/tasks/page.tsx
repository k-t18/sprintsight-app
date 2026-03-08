'use client';

import React, { useMemo, useState } from 'react';
import useAssignedProjects from '@/hooks/project/useAssignedProjects';
import FilterTabs from '@/components/shared/FilterTabs';
import useDeveloperTasks from '@/hooks/tasks/useDeveloperTasks';
import WorkItemGroups from '@/components/shared/WorkItemGroups';

const ALL_ISSUES_ID = 'all';

export default function TasksPage() {
    const { projects } = useAssignedProjects();
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(ALL_ISSUES_ID);

    const tabOptions = useMemo(
        () => [
            { id: ALL_ISSUES_ID, label: 'All issues' },
            ...projects.map((p) => ({ id: p.id, label: p.name })),
        ],
        [projects],
    );

    const { data: tasks = [], isLoading, error } = useDeveloperTasks();

    const filteredTasks = useMemo(() => {
        if (selectedProjectId === ALL_ISSUES_ID) return tasks;
        return tasks.filter((t) => t.project_id === selectedProjectId);
    }, [tasks, selectedProjectId]);

    return (
        <main className="min-h-screen bg-brand-base p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-brand-text mb-2">
                        Tasks
                    </h1>
                    <p className="text-brand-textSecondary mb-6">
                        Create and manage tasks for your sprints
                    </p>
                    <FilterTabs
                        options={tabOptions}
                        selectedId={selectedProjectId}
                        onSelect={setSelectedProjectId}
                    />
                </div>
                {isLoading ? (
                    <div className="text-brand-textSecondary">Loading…</div>
                ) : error ? (
                    <div className="text-red-500">Failed to load tasks</div>
                ) : (
                    <WorkItemGroups tasks={filteredTasks} />
                )}
            </div>
        </main>
    );
}
