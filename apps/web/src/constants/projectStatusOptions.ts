import { SelectOption } from '@/components/form';

export const projectStatusOptions: SelectOption[] = [
    { value: 'planning', label: 'Planning' },
    { value: 'active', label: 'In Progress' },
    { value: 'on_hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
];
