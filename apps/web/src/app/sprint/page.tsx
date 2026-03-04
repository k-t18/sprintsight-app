'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SprintsList from '@/components/modules/sprint/SprintList';
import FormDrawer from '@/components/modules/dashboards/developer/FormDrawer';
import SprintForm from '@/components/modules/sprint/SprintForm';

export default function SprintsPage() {
    const [open, setOpen] = useState(false);

    const handleSubmit = (data: any) => {
        console.log('Create sprint from sprints page', data);
        setOpen(false);
    };

    return (
        <main className="min-h-screen bg-brand-base p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-brand-text mb-2">
                        Sprints
                    </h1>
                    <p className="text-brand-textSecondary mb-6">
                        Create and manage sprints for your projects
                    </p>
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="inline-flex px-6 py-3 bg-brand-accent hover:bg-brand-accentHover text-brand-base font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        + New Sprint
                    </button>
                </div>

                <div>
                    <SprintsList
                        sprints={[]}
                        projects={[]}
                        onDelete={() => {}}
                    />
                </div>
            </div>

            <FormDrawer
                open={open}
                title="Create Sprint"
                onClose={() => setOpen(false)}
            >
                <SprintForm
                    onSubmit={handleSubmit}
                    onCancel={() => setOpen(false)}
                />
            </FormDrawer>
        </main>
    );
}
