'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export type TreeNode = {
    id: string;
    label: string;
    children?: TreeNode[];
};

type DbProfile = {
    id: string;
    full_name: string | null;
    role: string | null;
    project_members?: Array<{
        project_id: string;
        projects: {
            id: string;
            name: string;
            status?: string | null;
            start_date?: string | null;
            end_date?: string | null;
        } | null;
    }>;
};

type DbSprint = {
    id: string;
    name: string;
    project_id: string;
    start_date?: string | null;
    end_date?: string | null;
    tasks?: Array<{
        id: string;
        title: string;
        status: string | null;
        priority: string | null;
    }>;
};

export default function useBuildHierarchyTree() {
    const [tree, setTree] = useState<TreeNode | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function run() {
            setLoading(true);
            setError(null);

            try {
                // 1) Call #1: profiles with assigned projects
                const { data: profiles, error: pErr } = await supabase
                    .from('profiles')
                    .select(
                        `
            id,
            full_name,
            role,
            project_members:project_members!project_members_profile_id_fkey (
              project_id,
              projects (
                id,
                name,
                status,
                start_date,
                end_date
              )
            )
          `,
                    )
                    .returns<DbProfile[]>();

                if (pErr) throw pErr;
                if (!profiles) throw new Error('No profiles returned');

                // Extract unique project IDs
                const projectIds = Array.from(
                    new Set(
                        profiles.flatMap((p) =>
                            (p.project_members ?? []).map(
                                (pm) => pm.project_id,
                            ),
                        ),
                    ),
                );

                // If no projects assigned, return minimal tree
                if (projectIds.length === 0) {
                    const root: TreeNode = {
                        id: 'team',
                        label: 'Development Team',
                        children: profiles.map((p) => ({
                            id: `member:${p.id}`,
                            label: p.full_name ?? 'Unnamed',
                            children: [],
                        })),
                    };
                    if (!cancelled) setTree(root);
                    return;
                }

                // 2) Call #2: sprints with tasks for these projects (this month only)
                const now = new Date();
                const monthStart = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    1,
                )
                    .toISOString()
                    .slice(0, 10);
                const monthEnd = new Date(
                    now.getFullYear(),
                    now.getMonth() + 1,
                    0,
                )
                    .toISOString()
                    .slice(0, 10);

                const { data: sprints, error: sErr } = await supabase
                    .from('sprints')
                    .select(
                        `
            id,
            name,
            project_id,
            start_date,
            end_date,
            tasks (
              id,
              title,
              status,
              priority
            )
          `,
                    )
                    .in('project_id', projectIds)
                    .gte('start_date', monthStart)
                    .lte('start_date', monthEnd)
                    .returns<DbSprint[]>();

                if (sErr) throw sErr;

                const sprintsByProjectId = new Map<string, DbSprint[]>();
                for (const sp of sprints ?? []) {
                    const arr = sprintsByProjectId.get(sp.project_id) ?? [];
                    arr.push(sp);
                    sprintsByProjectId.set(sp.project_id, arr);
                }

                // 3) Build Tree
                const root: TreeNode = {
                    id: 'team',
                    label: 'Development Team',
                    children: profiles.map((p) => {
                        const assignedProjects = (p.project_members ?? [])
                            .map((pm) => pm.projects)
                            .filter(Boolean) as NonNullable<
                            DbProfile['project_members']
                        >[number]['projects'][];

                        const projectNodes: TreeNode[] = assignedProjects.map(
                            (proj) => {
                                const projectSprints = (
                                    sprintsByProjectId.get(proj?.id ?? '') ?? []
                                ).sort(
                                    (a, b) =>
                                        (a.start_date ?? '').localeCompare(
                                            b.start_date ?? '',
                                        ),
                                );

                                const sprintNodes: TreeNode[] =
                                    projectSprints.map((sp) => {
                                        const myTasks = sp.tasks ?? [];

                                        const taskNodes: TreeNode[] =
                                            myTasks.map((t) => ({
                                                id: `task:${t.id}`,
                                                label: t.title,
                                            }));

                                        return {
                                            id: `sprint:${sp.id}`,
                                            label: sp.name,
                                            children: taskNodes,
                                        };
                                    });

                                return {
                                    id: `project:${proj?.id ?? ''}`,
                                    label: proj?.name ?? '',
                                    children: sprintNodes,
                                };
                            },
                        );

                        return {
                            id: `member:${p.id}`,
                            label: p.full_name ?? 'Unnamed',
                            children: projectNodes,
                        };
                    }),
                };

                if (!cancelled) setTree(root);
            } catch (e: any) {
                if (!cancelled) setError(e?.message ?? 'Unknown error');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        run();
        return () => {
            cancelled = true;
        };
    }, []);
    console.log('tree', tree ?? []);

    return { tree, loading, error };
}
