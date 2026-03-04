'use client';

import { Trash2, Zap } from 'lucide-react';

interface TasksListProps {
    tasks: any[];
    sprints: any[];
    onDelete: (id: number) => void;
}

const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
        Critical: 'bg-red-500/15 text-red-300',
        High: 'bg-orange-500/15 text-orange-300',
        Medium: 'bg-yellow-500/15 text-yellow-300',
        Low: 'bg-emerald-500/15 text-emerald-300',
    };
    return colors[priority] || 'bg-brand-base text-brand-textSecondary';
};

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        'To Do': 'bg-brand-base text-brand-textSecondary',
        'In Progress': 'bg-blue-500/15 text-blue-300',
        'In Review': 'bg-purple-500/15 text-purple-300',
        Done: 'bg-emerald-500/15 text-emerald-300',
    };
    return colors[status] || 'bg-brand-base text-brand-textSecondary';
};

export default function TasksList({
    tasks,
    sprints,
    onDelete,
}: TasksListProps) {
    const getSprintName = (sprintId: string | number) => {
        return sprints.find((s) => s.id === sprintId)?.name || 'Unknown Sprint';
    };

    const calculateDuration = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil(
            (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
        );
        return days;
    };

    if (tasks.length === 0) {
        return (
            <div className="bg-brand-surface rounded-xl border border-brand-border p-12 text-center">
                <Zap size={48} className="mx-auto text-brand-textMuted mb-4" />
                <h3 className="text-xl font-semibold text-brand-text mb-2">
                    No tasks yet
                </h3>
                <p className="text-brand-textSecondary">
                    Create your first task to start tracking progress
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="bg-brand-surface rounded-xl border border-brand-border overflow-hidden hover:border-brand-accent/30 transition-all"
                >
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-brand-text mb-2">
                                    {task.title}
                                </h3>
                                <p className="text-sm text-brand-textSecondary">
                                    Sprint: {getSprintName(task.sprintId)}
                                </p>
                            </div>
                            <button
                                onClick={() => onDelete(task.id)}
                                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-400 hover:text-red-300"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <p className="text-brand-textSecondary mb-4 text-sm leading-relaxed">
                            {task.description}
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-brand-border">
                            <div>
                                <p className="text-xs text-brand-textMuted mb-1">
                                    Duration
                                </p>
                                <p className="font-semibold text-brand-text">
                                    {calculateDuration(
                                        task.startDate,
                                        task.endDate,
                                    )}{' '}
                                    days
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-brand-textMuted mb-1">
                                    Start Date
                                </p>
                                <p className="font-semibold text-brand-text">
                                    {task.startDate}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-brand-textMuted mb-1">
                                    End Date
                                </p>
                                <p className="font-semibold text-brand-text">
                                    {task.endDate}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}
                            >
                                {task.priority}
                            </span>
                            <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}
                            >
                                {task.status}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
