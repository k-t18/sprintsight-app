'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TasksList from '@/components/modules/task/TasksList';
import FormDrawer from '@/components/modules/dashboards/developer/FormDrawer';
import TaskForm from '@/components/modules/task/TaskForm';

export default function TasksPage() {
    const [open, setOpen] = useState(false);

    const handleSubmit = (data: any) => {
        // Integrate with task creation flow here
        console.log('Create task from tasks page', data);
        setOpen(false);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                        Tasks
                    </h1>
                    <p className="text-slate-600 mb-6">
                        Create and manage tasks for your sprints
                    </p>
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="inline-flex px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        + New Task
                    </button>
                </div>

                {/* Tasks List Section */}
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
                    sprints={[]}
                    onSubmit={handleSubmit}
                    onCancel={() => setOpen(false)}
                />
            </FormDrawer>
        </main>
    );
}
