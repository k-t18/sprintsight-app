'use client';

import { useState } from 'react';
import {
    ChevronDown,
    ChevronRight,
    Users,
    User,
    Zap,
    CheckSquare,
    FolderOpen,
} from 'lucide-react';
import type { TreeNode } from '@/hooks/hierarchyTree/useBuildHierarchyTree';

type NodeType = 'team' | 'member' | 'project' | 'sprint' | 'task';

function getNodeType(id: string): NodeType {
    if (id === 'team') return 'team';
    if (id.startsWith('member:')) return 'member';
    if (id.startsWith('project:')) return 'project';
    if (id.startsWith('sprint:')) return 'sprint';
    if (id.startsWith('task:')) return 'task';
    return 'member';
}

type HierarchyTreeNodeProps = {
    node: TreeNode;
    depth: number;
    parentExpanded: boolean;
};

export function HierarchyTreeNode({
    node,
    depth,
    parentExpanded,
}: HierarchyTreeNodeProps) {
    const [expanded, setExpanded] = useState(depth < 2);
    const hasChildren = node.children && node.children.length > 0;
    const showChildren = parentExpanded && expanded && hasChildren;
    const type = getNodeType(node.id);

    const iconMap = {
        team: <Users size={18} className="text-brand-accent" />,
        member: <User size={18} className="text-brand-textSecondary" />,
        project: <FolderOpen size={18} className="text-brand-accentMuted" />,
        sprint: <Zap size={18} className="text-brand-accent" />,
        task: <CheckSquare size={18} className="text-brand-accentMuted" />,
    } as const;

    const boxClassMap = {
        team: 'bg-brand-accent/20 border-brand-accent text-brand-text',
        member:
            'bg-brand-surface border-brand-border hover:bg-brand-surfaceHover text-brand-text',
        project:
            'bg-brand-surfaceHover/80 border-brand-borderLight text-brand-text',
        sprint: 'bg-brand-accent/15 border-brand-accent text-brand-text',
        task: 'bg-brand-surface border-brand-borderLight text-brand-textSecondary',
    } as const;

    const sprintTaskCount =
        type === 'sprint' ? (node.children?.length ?? 0) : null;

    const nodeBlock = (
        <div className="flex items-center gap-2 flex-shrink-0">
            <div
                className={`${boxClassMap[type]} rounded-xl px-4 py-3 text-center min-w-[140px] transition-all duration-200 hover:scale-[1.02] flex items-center gap-2 justify-center border shadow-sm`}
            >
                {iconMap[type]}
                <span className="text-sm font-medium truncate max-w-[200px]">
                    {node.label}
                </span>
                {sprintTaskCount !== null && (
                    <span
                        className="flex-shrink-0 rounded-full bg-brand-accent/30 px-2 py-0.5 text-xs font-semibold text-brand-accent"
                        title={`${sprintTaskCount} task(s)`}
                    >
                        {sprintTaskCount}
                    </span>
                )}
            </div>
            {hasChildren && (
                <button
                    type="button"
                    onClick={() => setExpanded((e) => !e)}
                    className="w-6 h-6 rounded-full border-2 border-brand-accent bg-brand-accent/20 hover:bg-brand-accent/30 text-brand-accent flex items-center justify-center transition-all duration-200 flex-shrink-0"
                    aria-label={expanded ? 'Collapse' : 'Expand'}
                >
                    {expanded ? (
                        <ChevronDown size={14} />
                    ) : (
                        <ChevronRight size={14} />
                    )}
                </button>
            )}
        </div>
    );

    return (
        <div className="flex flex-col flex-shrink-0">
            <div className="flex flex-row items-center flex-shrink-0">
                {depth > 0 && (
                    <div
                        className="w-8 h-px bg-brand-borderLight flex-shrink-0"
                        aria-hidden
                    />
                )}
                {nodeBlock}
            </div>
            {showChildren && (
                <div className="flex flex-col flex-shrink-0 ml-8 relative">
                    <div
                        className="absolute left-0 top-0 bottom-0 w-px bg-brand-borderLight pointer-events-none"
                        aria-hidden
                    />
                    <div className="flex flex-col gap-4">
                        {node.children!.map((child) => (
                            <div key={child.id} className="relative flex pt-6">
                                <div
                                    className="absolute -left-8 top-6 w-8 h-px bg-brand-borderLight pointer-events-none"
                                    aria-hidden
                                />
                                <div className="pl-2">
                                    <HierarchyTreeNode
                                        node={child}
                                        depth={depth + 1}
                                        parentExpanded={showChildren}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export function countNodes(node: TreeNode): {
    members: number;
    projects: number;
    sprints: number;
    tasks: number;
} {
    const type = getNodeType(node.id);
    let members = type === 'member' ? 1 : 0;
    let projects = type === 'project' ? 1 : 0;
    let sprints = type === 'sprint' ? 1 : 0;
    let tasks = type === 'task' ? 1 : 0;
    for (const c of node.children ?? []) {
        const sub = countNodes(c);
        members += sub.members;
        projects += sub.projects;
        sprints += sub.sprints;
        tasks += sub.tasks;
    }
    return { members, projects, sprints, tasks };
}
