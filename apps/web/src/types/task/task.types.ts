import { UUID } from '../id/id.types';
export type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export type Task = {
    id: UUID;
    sprintId: UUID;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    storyPoints?: number;
};
