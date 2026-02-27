import { UUID } from '../id/id.types';

export type Project = {
    id: UUID;
    name: string;
    description?: string;
    startDate?: string;
    endDate?: string;
};
