'use client';

import React, { useState } from 'react';
import {
    ChevronRight,
    Clock,
    Circle,
    CircleDashed,
    CheckCircle2,
    AlertTriangle,
    Plus,
} from 'lucide-react';
import type { DeveloperTask } from '@/hooks/tasks/useDeveloperTasks';

const STATUS_CONFIG: Record<
    string,
    { label: string; icon: React.ElementType; className: string }
> = {
    in_progress: {
        label: 'In Progress',
        icon: Clock,
        className: 'text-amber-500',
    },
    todo: {
        label: 'Todo',
        icon: Circle,
        className: 'text-brand-textMuted',
    },
    backlog: {
        label: 'Backlog',
        icon: CircleDashed,
        className: 'text-brand-textMuted',
    },
    blocked: {
        label: 'Backlog',
        icon: CircleDashed,
        className: 'text-brand-textMuted',
    },
    done: {
        label: 'Done',
        icon: CheckCircle2,
        className: 'text-blue-500',
    },
};

const defaultConfig = {
    label: 'Todo',
    icon: Circle,
    className: 'text-brand-textMuted',
};

type WorkItemGroupProps = {
    statusKey: string;
    tasks: DeveloperTask[];
    onAddTask?: (statusKey: string) => void;
};

export default function WorkItemGroup({
    statusKey,
    tasks,
    onAddTask,
}: WorkItemGroupProps) {
    const [expanded, setExpanded] = useState(true);
    const config = STATUS_CONFIG[statusKey] ?? defaultConfig;
    const StatusIcon = config.icon;

    return (
        <div className="border-b border-brand-border last:border-b-0">
            <button
                type="button"
                onClick={() => setExpanded((e) => !e)}
                className="w-full flex items-center gap-3 py-3 px-1 text-left hover:bg-brand-surface/50 transition-colors"
            >
                <ChevronRight
                    className={`w-4 h-4 text-brand-textMuted shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`}
                />
                <StatusIcon className={`w-4 h-4 shrink-0 ${config.className}`} />
                <span className="font-medium text-brand-text flex-1">
                    {config.label} {tasks.length}
                </span>
                {onAddTask && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddTask(statusKey);
                        }}
                        className="p-1 rounded text-brand-textMuted hover:bg-brand-surface hover:text-brand-text"
                        aria-label={`Add task to ${config.label}`}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                )}
            </button>
            {expanded && (
                <ul className="pb-2">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex items-start gap-3 py-2 px-1 pl-8 border-t border-brand-border/80"
                        >
                            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-mono text-brand-textSecondary">
                                        {task.id.slice(0, 8).toUpperCase()}
                                    </span>
                                    <StatusIcon
                                        className={`w-3.5 h-3.5 shrink-0 ${config.className}`}
                                    />
                                    <span className="text-brand-text">
                                        {task.title}
                                    </span>
                                </div>
                                {(task.projects?.name) && (
                                    <div className="flex items-center gap-2 mt-1 text-sm text-brand-textSecondary">
                                        <span>&gt;</span>
                                        <span>{task.projects.name}</span>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
