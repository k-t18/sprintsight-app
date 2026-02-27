'use client';

import Link from 'next/link';
import SprintsList from '@/components/modules/sprint/SprintList';

export default function SprintsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                        Sprints
                    </h1>
                    <p className="text-slate-600 mb-6">
                        Create and manage sprints for your projects
                    </p>
                    <Link
                        href="/sprints/new"
                        className="inline-flex px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        + New Sprint
                    </Link>
                </div>

                {/* Sprints List Section */}
                <div>
                    <SprintsList
                        sprints={[]}
                        projects={[]}
                        onDelete={() => {}}
                    />
                </div>
            </div>
        </main>
    );
}
