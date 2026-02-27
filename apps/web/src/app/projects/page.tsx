'use client';
import React, { useState } from 'react';
import ProjectsList from '@/components/modules/project/ProjectList';
import FormDrawer from '@/components/modules/dashboards/developer/FormDrawer';
import ProjectForm from '@/components/modules/project/ProjectForm';

const Page = () => {
    const [open, setOpen] = useState(false);

    const handleSubmit = (data: any) => {
        // Integrate with project creation flow here
        console.log('Create project from projects page', data);
        setOpen(false);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                        Projects
                    </h1>
                    <p className="text-slate-600 mb-6">
                        Create and manage your projects efficiently
                    </p>
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="inline-flex px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        + New Project
                    </button>
                </div>

                {/* Projects List Section */}
                <div>
                    <ProjectsList projects={[]} onDelete={() => {}} />
                </div>
            </div>

            <FormDrawer
                open={open}
                title="Create Project"
                onClose={() => setOpen(false)}
            >
                <ProjectForm
                    onSubmit={handleSubmit}
                    onCancel={() => setOpen(false)}
                />
            </FormDrawer>
        </main>
    );
};

export default Page;
