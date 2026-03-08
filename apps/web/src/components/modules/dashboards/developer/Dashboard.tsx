'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckSquare, ArrowRight, LogOut } from 'lucide-react';
import TaskForm from '../../task/TaskForm';
import dynamic from 'next/dynamic';
import useFetchTasksCount, {
    type TaskCounts,
} from '@/hooks/tasks/useFetchTasksCount';
import { supabase } from '@/lib/supabase/client';
import { usePushNotifications } from '@/hooks/shared/usePushNotifications';

const FormDrawer = dynamic(() => import('./FormDrawer'), { ssr: false });

const TASK_STATUS_MAP: { key: keyof TaskCounts; label: string }[] = [
    { key: 'todo', label: 'Backlog' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'blocked', label: 'Blocked' },
    { key: 'done', label: 'Done' },
];

const Dashboard = () => {
    const router = useRouter();
    const [activeForm, setActiveForm] = useState<'task' | null>(null);
    const { taskCounts } = useFetchTasksCount();
    const { status, enable } = usePushNotifications();
    const handleCloseDrawer = () => setActiveForm(null);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/auth/login');
    };

    const handleTaskSubmit = (data: any) => {
        console.log('Create task from dashboard', data);
        setActiveForm(null);
    };

    return (
        <main className="min-h-screen bg-brand-base p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-5xl font-bold text-brand-text mb-3">
                            Welcome to SprintSight
                        </h1>
                        <p className="text-xl text-brand-textSecondary">
                            Manage your projects, sprints, and tasks efficiently
                            in one place.
                        </p>
                    </div>
                    <button
                        onClick={enable}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-white"
                    >
                        Enable Notifications ({status})
                    </button>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 border border-brand-border rounded-lg text-brand-textSecondary hover:bg-brand-surface hover:text-brand-text transition-colors"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

                <div className="mb-12 max-w-md">
                    <Link href="/tasks" className="group block">
                        <div className="bg-brand-surface rounded-xl border border-brand-border p-8 hover:border-brand-accent/40 transition-all duration-300 hover:translate-y-[-4px] cursor-pointer">
                            <div className="bg-emerald-500/15 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <CheckSquare
                                    className="text-emerald-400"
                                    size={28}
                                />
                            </div>
                            <h3 className="text-brand-textSecondary text-xl font-medium mb-2">
                                Tasks
                            </h3>
                            <div className="flex items-baseline justify-between">
                                <div className="flex gap-6 flex-1">
                                    {TASK_STATUS_MAP.map(({ key, label }) => (
                                        <div
                                            key={key}
                                            className="flex flex-col items-center min-w-0"
                                        >
                                            <span className="text-brand-textSecondary text-xs font-medium uppercase tracking-wide">
                                                {label}
                                            </span>
                                            <span className="text-2xl font-bold text-brand-text mt-1">
                                                {taskCounts[key]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <ArrowRight
                                    className="text-brand-textMuted group-hover:text-brand-accent transition-colors shrink-0 ml-2"
                                    size={20}
                                />
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="bg-brand-surface rounded-xl border border-brand-border p-8">
                    <h2 className="text-2xl font-bold text-brand-text mb-6">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            type="button"
                            onClick={() => setActiveForm('task')}
                            className="flex items-center justify-between px-6 py-4 border-2 border-brand-border rounded-lg hover:border-emerald-400 hover:bg-emerald-400/10 transition-all duration-200 group"
                        >
                            <span className="font-semibold text-brand-textSecondary group-hover:text-emerald-400">
                                Create Task
                            </span>
                            <ArrowRight
                                size={20}
                                className="text-brand-textMuted group-hover:text-emerald-400"
                            />
                        </button>
                    </div>
                </div>
            </div>

            <FormDrawer
                open={activeForm === 'task'}
                title="Create Task"
                onClose={handleCloseDrawer}
            >
                <TaskForm
                    onSubmit={handleTaskSubmit}
                    onCancel={handleCloseDrawer}
                />
            </FormDrawer>
        </main>
    );
};

export default Dashboard;
