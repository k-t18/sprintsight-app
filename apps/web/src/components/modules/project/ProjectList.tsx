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
    Planning: { color: 'text-blue-700', bg: 'bg-blue-100', icon: AlertCircle },
    'In Progress': { color: 'text-amber-700', bg: 'bg-amber-100', icon: Clock },
    'On Hold': {
        color: 'text-orange-700',
        bg: 'bg-orange-100',
        icon: AlertCircle,
    },
    Completed: {
        color: 'text-green-700',
        bg: 'bg-green-100',
        icon: CheckCircle2,
    },
    Cancelled: { color: 'text-red-700', bg: 'bg-red-100', icon: Ban },
};

export default function ProjectsList({
    projects,
    onDelete,
}: ProjectsListProps) {
    if (projects.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-12 border border-slate-200 flex flex-col items-center justify-center">
                <div className="text-slate-400 mb-4">
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
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    No projects yet
                </h3>
                <p className="text-slate-600">
                    Create your first project to get started
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Your Projects
            </h2>
            {projects.map((project) => {
                const config =
                    statusConfig[project.status] || statusConfig['Planning'];
                const StatusIcon = config.icon;

                return (
                    <div
                        key={project.id}
                        className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-all duration-200"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900">
                                    {project.name}
                                </h3>
                                {project.description && (
                                    <p className="text-slate-600 text-sm mt-1 line-clamp-2">
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
                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            {/* Manager Info */}
                            <div className="flex items-start gap-3 bg-slate-50 rounded-lg p-3">
                                <Users
                                    size={18}
                                    className="text-blue-600 mt-0.5 flex-shrink-0"
                                />
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">
                                        Manager
                                    </p>
                                    <p className="text-sm font-semibold text-slate-900">
                                        {project.manager}
                                    </p>
                                </div>
                            </div>

                            {/* Dates Info */}
                            <div className="flex items-start gap-3 bg-slate-50 rounded-lg p-3">
                                <Calendar
                                    size={18}
                                    className="text-green-600 mt-0.5 flex-shrink-0"
                                />
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">
                                        Duration
                                    </p>
                                    <p className="text-sm font-semibold text-slate-900">
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

                        <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200">
                            <span>Created on {project.createdAt}</span>
                            <span className="px-2 py-1 bg-slate-100 rounded text-slate-600">
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
