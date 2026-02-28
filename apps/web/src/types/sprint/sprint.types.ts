import { UUID } from '../id/id.types';

export type SprintTypes = {
    id: UUID;
    project_id: UUID;
    name: string;
    start_date: string;
    end_date: string;
    status: string;
    goal: string;
};
