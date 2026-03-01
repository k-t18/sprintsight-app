'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FolderOpen, Zap, CheckSquare, ArrowRight, LogOut } from 'lucide-react';
import ProjectForm from '../../project/ProjectForm';
import SprintForm from '../../sprint/SprintForm';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase/client';

const FormDrawer = dynamic(
    () => import('../developer/FormDrawer'),
    { ssr: false }
);

const Dashboard = () => {
    const router = useRouter();
    const [activeForm, setActiveForm] = useState<
        'project' | 'sprint' | null
    >(null);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/auth/login');
    };

    const handleCloseDrawer = () => setActiveForm(null);

    const handleProjectSubmit = (data: any) => {
        console.log('Create project from dashboard', data);
        setActiveForm(null);
    };

    const handleSprintSubmit = (data: any) => {
        console.log('Create sprint from dashboard', data);
        setActiveForm(null);
    };

    const stats = [
        {
            label: 'Total Projects',
            value: 0,
            icon: FolderOpen,
            color: 'bg-brand-accentMuted/20',
            iconColor: 'text-brand-accent',
            href: '/projects',
        },
        {
            label: 'Total Sprints',
            value: 0,
            icon: Zap,
            color: 'bg-amber-500/15',
            iconColor: 'text-amber-400',
            href: '/sprint',
        },
        {
            label: 'Total Tasks',
            value: 0,
            icon: CheckSquare,
            color: 'bg-emerald-500/15',
            iconColor: 'text-emerald-400',
            href: '/task',
        },
    ];

    return (
        <main className="min-h-screen bg-brand-base p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-5xl font-bold text-brand-text mb-3">
                            Welcome to SprintSight
                        </h1>
                        <p className="text-xl text-brand-textSecondary">
                            Manage your projects, sprints, and tasks efficiently in
                            one place.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 border border-brand-border rounded-lg text-brand-textSecondary hover:bg-brand-surface hover:text-brand-text transition-colors"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Link
                                key={stat.href}
                                href={stat.href}
                                className="group block"
                            >
                                <div className="bg-brand-surface rounded-xl border border-brand-border p-8 hover:border-brand-accent/40 transition-all duration-300 hover:translate-y-[-4px] cursor-pointer">
                                    <div
                                        className={`${stat.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                                    >
                                        <Icon
                                            className={`${stat.iconColor}`}
                                            size={28}
                                        />
                                    </div>
                                    <h3 className="text-brand-textSecondary text-sm font-medium mb-2">
                                        {stat.label}
                                    </h3>
                                    <div className="flex items-baseline justify-between">
                                        <p className="text-3xl font-bold text-brand-text">
                                            {stat.value}
                                        </p>
                                        <ArrowRight
                                            className="text-brand-textMuted group-hover:text-brand-accent transition-colors"
                                            size={20}
                                        />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="bg-brand-surface rounded-xl border border-brand-border p-8">
                    <h2 className="text-2xl font-bold text-brand-text mb-6">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            type="button"
                            onClick={() => setActiveForm('project')}
                            className="flex items-center justify-between px-6 py-4 border-2 border-brand-border rounded-lg hover:border-brand-accent hover:bg-brand-accent/10 transition-all duration-200 group"
                        >
                            <span className="font-semibold text-brand-textSecondary group-hover:text-brand-accent">
                                Create Project
                            </span>
                            <ArrowRight
                                size={20}
                                className="text-brand-textMuted group-hover:text-brand-accent"
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveForm('sprint')}
                            className="flex items-center justify-between px-6 py-4 border-2 border-brand-border rounded-lg hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-200 group"
                        >
                            <span className="font-semibold text-brand-textSecondary group-hover:text-amber-400">
                                Create Sprint
                            </span>
                            <ArrowRight
                                size={20}
                                className="text-brand-textMuted group-hover:text-amber-400"
                            />
                        </button>
                    </div>
                </div>
            </div>

            <FormDrawer
                open={activeForm === 'project'}
                title="Create Project"
                onClose={handleCloseDrawer}
            >
                <ProjectForm
                    onSubmit={handleProjectSubmit}
                    onCancel={handleCloseDrawer}
                />
            </FormDrawer>

            <FormDrawer
                open={activeForm === 'sprint'}
                title="Create Sprint"
                onClose={handleCloseDrawer}
            >
                <SprintForm
                    onSubmit={handleSprintSubmit}
                    onCancel={handleCloseDrawer}
                />
            </FormDrawer>
        </main>
    );
};

export default Dashboard;
