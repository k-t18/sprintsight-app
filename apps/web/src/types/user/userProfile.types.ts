import { UUID } from '@/types/id/id.types';

export interface UserProfileTypes {
    id: UUID;
    full_name: string | null;
    role: string | null;
}
