'use client';

import Link from 'next/link';
import TasksList from '@/components/modules/task/TasksList';

export default function TasksPage() {
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
                    <Link
                        href="/tasks/new"
                        className="inline-flex px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        + New Task
                    </Link>
                </div>

                {/* Tasks List Section */}
                <div>
                    <TasksList tasks={[]} sprints={[]} onDelete={() => {}} />
                </div>
            </div>
        </main>
    );
}
