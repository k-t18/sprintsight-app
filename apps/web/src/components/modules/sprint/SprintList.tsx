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
        Planning: 'bg-yellow-500/15 text-yellow-300',
        Active: 'bg-emerald-500/15 text-emerald-300',
        Completed: 'bg-blue-500/15 text-blue-300',
        'On Hold': 'bg-orange-500/15 text-orange-300',
    };
    return colors[status] || 'bg-brand-base text-brand-textSecondary';
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
            <div className="bg-brand-surface rounded-xl border border-brand-border p-12 text-center">
                <Zap size={48} className="mx-auto text-brand-textMuted mb-4" />
                <h3 className="text-xl font-semibold text-brand-text mb-2">
                    No sprints yet
                </h3>
                <p className="text-brand-textSecondary">
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
                    className="bg-brand-surface rounded-xl border border-brand-border overflow-hidden hover:border-brand-accent/30 transition-all"
                >
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-brand-text mb-2">
                                    {sprint.name}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-brand-textSecondary mb-3">
                                    <FolderOpen size={16} />
                                    {getProjectName(sprint.projectId)}
                                </div>
                            </div>
                            <button
                                onClick={() => onDelete(sprint.id)}
                                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-400 hover:text-red-300"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <p className="text-brand-textSecondary mb-4 text-sm leading-relaxed">
                            {sprint.goal}
                        </p>

                        <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-brand-border">
                            <div>
                                <p className="text-xs text-brand-textMuted mb-1">
                                    Duration
                                </p>
                                <p className="font-semibold text-brand-text">
                                    {calculateDuration(
                                        sprint.startDate,
                                        sprint.endDate,
                                    )}{' '}
                                    days
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-brand-textMuted mb-1">
                                    Start Date
                                </p>
                                <p className="font-semibold text-brand-text">
                                    {sprint.startDate}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-brand-textMuted mb-1">
                                    End Date
                                </p>
                                <p className="font-semibold text-brand-text">
                                    {sprint.endDate}
                                </p>
                            </div>
                        </div>

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
