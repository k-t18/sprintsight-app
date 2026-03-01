'use client';

import {
    Calendar,
    Users,
    CheckCircle2,
    AlertCircle,
    Clock,
    Ban,
    Trash2,
} from 'lucide-react';

interface Project {
    id: number;
    name: string;
    description: string;
    manager: string;
    startDate: string;
    endDate: string;
    status: string;
    createdAt: string;
}

interface ProjectsListProps {
    projects: Project[];
    onDelete?: (id: number) => void;
}

const statusConfig: Record<string, { color: string; bg: string; icon: any }> = {
    Planning: { color: 'text-blue-300', bg: 'bg-blue-500/15', icon: AlertCircle },
    'In Progress': { color: 'text-amber-300', bg: 'bg-amber-500/15', icon: Clock },
    'On Hold': {
        color: 'text-orange-300',
        bg: 'bg-orange-500/15',
        icon: AlertCircle,
    },
    Completed: {
        color: 'text-emerald-300',
        bg: 'bg-emerald-500/15',
        icon: CheckCircle2,
    },
    Cancelled: { color: 'text-red-300', bg: 'bg-red-500/15', icon: Ban },
};

export default function ProjectsList({
    projects,
    onDelete,
}: ProjectsListProps) {
    if (projects.length === 0) {
        return (
            <div className="bg-brand-surface rounded-xl border border-brand-border p-12 flex flex-col items-center justify-center">
                <div className="text-brand-textMuted mb-4">
                    <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-brand-text mb-2">
                    No projects yet
                </h3>
                <p className="text-brand-textSecondary">
                    Create your first project to get started
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-text mb-6">
                Your Projects
            </h2>
            {projects.map((project) => {
                const config =
                    statusConfig[project.status] || statusConfig['Planning'];
                const StatusIcon = config.icon;

                return (
                    <div
                        key={project.id}
                        className="bg-brand-surface rounded-xl border border-brand-border p-6 hover:border-brand-accent/30 transition-all duration-200"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-brand-text">
                                    {project.name}
                                </h3>
                                {project.description && (
                                    <p className="text-brand-textSecondary text-sm mt-1 line-clamp-2">
                                        {project.description}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <div
                                    className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg}`}
                                >
                                    <StatusIcon
                                        size={16}
                                        className={config.color}
                                    />
                                    <span
                                        className={`text-sm font-semibold ${config.color}`}
                                    >
                                        {project.status}
                                    </span>
                                </div>
                                <button
                                    onClick={() => onDelete?.(project.id)}
                                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-400 hover:text-red-300"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-start gap-3 bg-brand-base rounded-lg p-3">
                                <Users
                                    size={18}
                                    className="text-brand-accent mt-0.5 flex-shrink-0"
                                />
                                <div>
                                    <p className="text-xs font-semibold text-brand-textMuted uppercase">
                                        Manager
                                    </p>
                                    <p className="text-sm font-semibold text-brand-text">
                                        {project.manager}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 bg-brand-base rounded-lg p-3">
                                <Calendar
                                    size={18}
                                    className="text-emerald-400 mt-0.5 flex-shrink-0"
                                />
                                <div>
                                    <p className="text-xs font-semibold text-brand-textMuted uppercase">
                                        Duration
                                    </p>
                                    <p className="text-sm font-semibold text-brand-text">
                                        {new Date(
                                            project.startDate,
                                        ).toLocaleDateString()}{' '}
                                        →{' '}
                                        {new Date(
                                            project.endDate,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-brand-textMuted pt-4 border-t border-brand-border">
                            <span>Created on {project.createdAt}</span>
                            <span className="px-2 py-1 bg-brand-base rounded text-brand-textSecondary">
                                {Math.ceil(
                                    (new Date(project.endDate).getTime() -
                                        new Date(project.startDate).getTime()) /
                                        (1000 * 60 * 60 * 24),
                                )}{' '}
                                days
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
