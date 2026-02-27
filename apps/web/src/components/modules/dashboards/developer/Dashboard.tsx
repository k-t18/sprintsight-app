import React from 'react';
import { FolderOpen, Zap, CheckSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';
const Dashboard = () => {
    const stats = [
        {
            label: 'Total Projects',
            value: 0,
            icon: FolderOpen,
            color: 'bg-blue-100',
            iconColor: 'text-blue-600',
            href: '/projects',
        },
        {
            label: 'Total Sprints',
            value: 0,
            icon: Zap,
            color: 'bg-amber-100',
            iconColor: 'text-amber-600',
            href: '/sprint',
        },
        {
            label: 'Total Tasks',
            value: 0,
            icon: CheckSquare,
            color: 'bg-green-100',
            iconColor: 'text-green-600',
            href: '/task',
        },
    ];
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold text-slate-900 mb-3">
                        Welcome to SprintSight
                    </h1>
                    <p className="text-xl text-slate-600">
                        Manage your projects, sprints, and tasks efficiently in
                        one place.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Link
                                key={stat.href}
                                href={stat.href}
                                className="group block"
                            >
                                <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] cursor-pointer">
                                    <div
                                        className={`${stat.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                                    >
                                        <Icon
                                            className={`${stat.iconColor}`}
                                            size={28}
                                        />
                                    </div>
                                    <h3 className="text-slate-600 text-sm font-medium mb-2">
                                        {stat.label}
                                    </h3>
                                    <div className="flex items-baseline justify-between">
                                        <p className="text-3xl font-bold text-slate-900">
                                            {stat.value}
                                        </p>
                                        <ArrowRight
                                            className="text-slate-300 group-hover:text-blue-600 transition-colors"
                                            size={20}
                                        />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            href="/projects/new"
                            className="flex items-center justify-between px-6 py-4 border-2 border-slate-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 group"
                        >
                            <span className="font-semibold text-slate-700 group-hover:text-blue-600">
                                Create Project
                            </span>
                            <ArrowRight
                                size={20}
                                className="text-slate-300 group-hover:text-blue-600"
                            />
                        </Link>
                        <Link
                            href="/sprints/new"
                            className="flex items-center justify-between px-6 py-4 border-2 border-slate-200 rounded-lg hover:border-amber-600 hover:bg-amber-50 transition-all duration-200 group"
                        >
                            <span className="font-semibold text-slate-700 group-hover:text-amber-600">
                                Create Sprint
                            </span>
                            <ArrowRight
                                size={20}
                                className="text-slate-300 group-hover:text-amber-600"
                            />
                        </Link>
                        <Link
                            href="/tasks/new"
                            className="flex items-center justify-between px-6 py-4 border-2 border-slate-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all duration-200 group"
                        >
                            <span className="font-semibold text-slate-700 group-hover:text-green-600">
                                Create Task
                            </span>
                            <ArrowRight
                                size={20}
                                className="text-slate-300 group-hover:text-green-600"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
