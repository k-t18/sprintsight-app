'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TaskForm from '@/components/modules/task/TaskForm';

export default function NewTaskPage() {
    const router = useRouter();

    const handleSubmit = (formData: any) => {
        console.log(formData);
        router.push('/tasks');
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link
                        href="/tasks"
                        className="text-blue-600 hover:text-blue-700 font-semibold mb-4 inline-block"
                    >
                        ← Back to Tasks
                    </Link>
                    <h1 className="text-4xl font-bold text-slate-900">
                        Create New Task
                    </h1>
                    <p className="text-slate-600 mt-2">
                        Fill in the details to create a new task
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-8">
                    <TaskForm
                        sprints={[]}
                        onSubmit={handleSubmit}
                        onCancel={() => router.back()}
                    />
                </div>
            </div>
        </main>
    );
}
