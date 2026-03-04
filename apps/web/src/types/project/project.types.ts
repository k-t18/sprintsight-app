import { UUID } from '../id/id.types';

export type ProjectTypes = {
    id: UUID;
    name: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    status: string;
    owner_person_id: string;
};
