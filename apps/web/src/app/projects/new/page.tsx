'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProjectForm from '@/components/modules/project/ProjectForm';

export default function NewProjectPage() {
    const router = useRouter();

    const handleSubmit = (formData: any) => {
        console.log(formData);
        router.push('/projects');
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link
                        href="/projects"
                        className="text-blue-600 hover:text-blue-700 font-semibold mb-4 inline-block"
                    >
                        ← Back to Projects
                    </Link>
                    <h1 className="text-4xl font-bold text-slate-900">
                        Create New Project
                    </h1>
                    <p className="text-slate-600 mt-2">
                        Fill in the details to create a new project
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-8">
                    <ProjectForm
                        onSubmit={handleSubmit}
                        onCancel={() => router.back()}
                    />
                </div>
            </div>
        </main>
    );
}
