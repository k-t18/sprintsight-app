'use client';

import { Users, User, Zap, CheckSquare } from 'lucide-react';
import useBuildHierarchyTree from '@/hooks/hierarchyTree/useBuildHierarchyTree';
import { HierarchyTreeNode, countNodes } from './HierarchyTreeNode';

export default function HierarchyChart() {
    const { tree, loading, error } = useBuildHierarchyTree();

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-base p-8 flex justify-center items-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-brand-borderLight border-t-brand-accent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-brand-textSecondary font-medium">
                        Building team overview...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-brand-base p-8 flex justify-center items-center">
                <div className="bg-brand-surface border border-brand-border rounded-lg p-6 max-w-md">
                    <p className="text-brand-text font-semibold mb-2">Error</p>
                    <p className="text-brand-textSecondary">{error}</p>
                </div>
            </div>
        );
    }

    if (!tree) return null;

    const counts = countNodes(tree);

    return (
        <main className="min-h-screen bg-brand-base p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-brand-text mb-2">
                    Team Overview
                </h1>
                <p className="text-brand-textSecondary">
                    Structure from projects, sprints, and tasks
                </p>
            </div>

            <div className="bg-brand-surface rounded-2xl border border-brand-border shadow-lg p-12 overflow-x-auto">
                <div className="inline-block">
                    <HierarchyTreeNode
                        node={tree}
                        depth={0}
                        parentExpanded={true}
                    />
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-brand-surface p-4 rounded-lg border border-brand-border shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Users size={18} className="text-brand-accent" />
                        <span className="text-sm font-semibold text-brand-textSecondary">
                            Teams
                        </span>
                    </div>
                    <p className="text-2xl font-bold text-brand-accent">1</p>
                </div>
                <div className="bg-brand-surface p-4 rounded-lg border border-brand-border shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <User size={18} className="text-brand-textSecondary" />
                        <span className="text-sm font-semibold text-brand-textSecondary">
                            Members
                        </span>
                    </div>
                    <p className="text-2xl font-bold text-brand-text">
                        {counts.members}
                    </p>
                </div>
                <div className="bg-brand-surface p-4 rounded-lg border border-brand-border shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap size={18} className="text-brand-accent" />
                        <span className="text-sm font-semibold text-brand-textSecondary">
                            Sprints
                        </span>
                    </div>
                    <p className="text-2xl font-bold text-brand-text">
                        {counts.sprints}
                    </p>
                </div>
                <div className="bg-brand-surface p-4 rounded-lg border border-brand-border shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckSquare
                            size={18}
                            className="text-brand-accentMuted"
                        />
                        <span className="text-sm font-semibold text-brand-textSecondary">
                            Tasks
                        </span>
                    </div>
                    <p className="text-2xl font-bold text-brand-text">
                        {counts.tasks}
                    </p>
                </div>
            </div>
        </main>
    );
}
