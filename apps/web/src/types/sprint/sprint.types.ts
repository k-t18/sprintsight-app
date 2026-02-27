import { UUID } from '../id/id.types';

export type Sprint = {
    id: UUID;
    projectId: UUID;
    name: string;
    startDate?: string; // ISO string for mock
    endDate?: string;
};
