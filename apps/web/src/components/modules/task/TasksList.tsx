'use client';

import { Trash2, Zap } from 'lucide-react';

interface TasksListProps {
    tasks: any[];
    sprints: any[];
    onDelete: (id: number) => void;
}

const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
        Critical: 'bg-red-100 text-red-800',
        High: 'bg-orange-100 text-orange-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        Low: 'bg-green-100 text-green-800',
    };
    return colors[priority] || 'bg-slate-100 text-slate-800';
};

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        'To Do': 'bg-slate-100 text-slate-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        'In Review': 'bg-purple-100 text-purple-800',
        Done: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-slate-100 text-slate-800';
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
            <div className="bg-white rounded-xl shadow-lg p-12 border border-slate-200 text-center">
                <Zap size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    No tasks yet
                </h3>
                <p className="text-slate-600">
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
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-200 overflow-hidden hover:border-blue-300"
                >
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                    {task.title}
                                </h3>
                                <p className="text-sm text-slate-600">
                                    Sprint: {getSprintName(task.sprintId)}
                                </p>
                            </div>
                            <button
                                onClick={() => onDelete(task.id)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500 hover:text-red-700"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        {/* Description */}
                        <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                            {task.description}
                        </p>

                        {/* Meta Info */}
                        <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-slate-200">
                            <div>
                                <p className="text-xs text-slate-500 mb-1">
                                    Duration
                                </p>
                                <p className="font-semibold text-slate-900">
                                    {calculateDuration(
                                        task.startDate,
                                        task.endDate,
                                    )}{' '}
                                    days
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">
                                    Start Date
                                </p>
                                <p className="font-semibold text-slate-900">
                                    {task.startDate}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">
                                    End Date
                                </p>
                                <p className="font-semibold text-slate-900">
                                    {task.endDate}
                                </p>
                            </div>
                        </div>

                        {/* Status and Priority Badges */}
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
