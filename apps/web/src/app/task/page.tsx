'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TasksList from '@/components/modules/task/TasksList';
import FormDrawer from '@/components/modules/dashboards/developer/FormDrawer';
import TaskForm from '@/components/modules/task/TaskForm';

export default function TasksPage() {
    const [open, setOpen] = useState(false);

    const handleSubmit = (data: any) => {
        console.log('Create task from tasks page', data);
        setOpen(false);
    };

    return (
        <main className="min-h-screen bg-brand-base p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-brand-text mb-2">
                        Tasks
                    </h1>
                    <p className="text-brand-textSecondary mb-6">
                        Create and manage tasks for your sprints
                    </p>
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="inline-flex px-6 py-3 bg-brand-accent hover:bg-brand-accentHover text-brand-base font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        + New Task
                    </button>
                </div>

                <div>
                    <TasksList tasks={[]} sprints={[]} onDelete={() => {}} />
                </div>
            </div>

            <FormDrawer
                open={open}
                title="Create Task"
                onClose={() => setOpen(false)}
            >
                <TaskForm
                    onSubmit={handleSubmit}
                    onCancel={() => setOpen(false)}
                />
            </FormDrawer>
        </main>
    );
}
