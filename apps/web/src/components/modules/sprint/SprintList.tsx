'use client';

import { Calendar, Trash2, FolderOpen } from 'lucide-react';
import { Zap } from 'lucide-react';

interface SprintListProps {
    sprints: any[];
    projects: any[];
    onDelete: (id: number) => void;
}

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        Planning: 'bg-yellow-100 text-yellow-800',
        Active: 'bg-green-100 text-green-800',
        Completed: 'bg-blue-100 text-blue-800',
        'On Hold': 'bg-orange-100 text-orange-800',
    };
    return colors[status] || 'bg-slate-100 text-slate-800';
};

export default function SprintsList({
    sprints,
    projects,
    onDelete,
}: SprintListProps) {
    const getProjectName = (projectId: string | number) => {
        return (
            projects.find((p) => p.id === projectId)?.name || 'Unknown Project'
        );
    };

    const calculateDuration = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil(
            (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
        );
        return days;
    };

    if (sprints.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-12 border border-slate-200 text-center">
                <Zap size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    No sprints yet
                </h3>
                <p className="text-slate-600">
                    Create your first sprint to get started with sprint planning
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {sprints.map((sprint) => (
                <div
                    key={sprint.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-200 overflow-hidden hover:border-blue-300"
                >
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                    {sprint.name}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                                    <FolderOpen size={16} />
                                    {getProjectName(sprint.projectId)}
                                </div>
                            </div>
                            <button
                                onClick={() => onDelete(sprint.id)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500 hover:text-red-700"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        {/* Goal */}
                        <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                            {sprint.goal}
                        </p>

                        {/* Meta Info */}
                        <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-slate-200">
                            <div>
                                <p className="text-xs text-slate-500 mb-1">
                                    Duration
                                </p>
                                <p className="font-semibold text-slate-900">
                                    {calculateDuration(
                                        sprint.startDate,
                                        sprint.endDate,
                                    )}{' '}
                                    days
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">
                                    Start Date
                                </p>
                                <p className="font-semibold text-slate-900">
                                    {sprint.startDate}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">
                                    End Date
                                </p>
                                <p className="font-semibold text-slate-900">
                                    {sprint.endDate}
                                </p>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex justify-end">
                            <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                    sprint.status,
                                )}`}
                            >
                                {sprint.status}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
