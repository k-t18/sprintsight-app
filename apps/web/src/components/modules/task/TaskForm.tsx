'use client';

import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { TASKS_COUNT_QUERY_KEY } from '@/hooks/tasks/useFetchTasksCount';
import {
    FormInput,
    FormTextarea,
    FormSelect,
    FormButton,
} from '@/components/form';
import useGetSprints from '@/hooks/shared/useGetSprints';
import {
    taskPriorityOptions,
    taskStatusOptions,
} from '@/constants/taskStatusOptions';
import useAssignedProjects from '@/hooks/project/useAssignedProjects';
import { useUser } from '@/hooks/shared/useGetLoggedInUser';

export interface TaskFormValues {
    title: string;
    description: string;
    sprint_id: string;
    project_id: string;
    priority: string;
    status: string;
    start_date: string | null;
    end_date: string | null;
}

interface TaskFormProps {
    onSubmit: (data: TaskFormValues) => void;
    onCancel: () => void;
}

const defaultValues: TaskFormValues = {
    title: '',
    description: '',
    project_id: '',
    sprint_id: '',
    priority: 'medium',
    status: 'todo',
    start_date: '',
    end_date: '',
};

export default function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
    const user = useUser();
    const queryClient = useQueryClient();
    const { projects: assignedProjects } = useAssignedProjects();

    const {
        control,
        handleSubmit: rhfSubmit,
        watch,
        setValue,
        reset,
        getValues,
        formState: { errors },
    } = useForm<TaskFormValues & { project_id: string }>({
        defaultValues: { ...defaultValues, project_id: '' },
    });

    const projectId = watch('project_id');
    const { data: sprintsData } = useGetSprints(projectId || undefined, {
        enabled: !!projectId,
    });
    const projectOptions = assignedProjects.map((p) => ({
        value: p.id,
        label: p.name,
    }));
    const sprintOptions =
        sprintsData?.map((s) => ({ value: s.id, label: s.name })) ?? [];

    const onSubmitForm = async (
        data: TaskFormValues & { project_id: string },
    ) => {
        if (!user?.id) return;
        const payload = {
            ...data,
            start_date: data.start_date?.trim() ? data.start_date : null,
            end_date: data.end_date?.trim() ? data.end_date : null,
            created_by: user.id,
        };
        try {
            const { error } = await supabase.from('tasks').insert(payload);
            if (error) {
                console.error(error);
                return;
            }
            await queryClient.invalidateQueries({ queryKey: TASKS_COUNT_QUERY_KEY });
            onSubmit(payload);
            reset({ ...defaultValues, project_id: '' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-brand-surface rounded-xl p-6 border border-brand-border">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-brand-text">
                    Create New Task
                </h2>
            </div>

            <form onSubmit={rhfSubmit(onSubmitForm)} className="space-y-5">
                <Controller
                    name="project_id"
                    control={control}
                    rules={{ required: 'Please select a project' }}
                    render={({ field }) => (
                        <FormSelect
                            id="project_id"
                            label="Project"
                            options={projectOptions}
                            placeholder="Select a project"
                            error={errors.project_id?.message}
                            wrapperClassName=""
                            {...field}
                            onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value);
                                setValue('sprint_id', '');
                            }}
                        />
                    )}
                />

                <Controller
                    name="sprint_id"
                    control={control}
                    rules={{ required: 'Please select a sprint' }}
                    render={({ field }) => (
                        <FormSelect
                            id="sprint_id"
                            label="Sprint"
                            options={sprintOptions}
                            placeholder={
                                projectId
                                    ? 'Select a sprint'
                                    : 'Select a project first'
                            }
                            error={errors.sprint_id?.message}
                            wrapperClassName=""
                            disabled={!projectId}
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="title"
                    control={control}
                    rules={{ required: 'Task title is required' }}
                    render={({ field }) => (
                        <FormInput
                            id="title"
                            label="Task Title"
                            placeholder="e.g., Implement user authentication"
                            error={errors.title?.message}
                            wrapperClassName=""
                            {...field}
                        />
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <FormTextarea
                            id="description"
                            label="Description"
                            placeholder="Describe the task in detail..."
                            rows={3}
                            error={errors.description?.message}
                            wrapperClassName=""
                            {...field}
                        />
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Controller
                        name="start_date"
                        control={control}
                        rules={{ required: 'Start date is required' }}
                        render={({ field }) => (
                            <FormInput
                                id="start_date"
                                type="date"
                                label="Start Date"
                                error={errors.start_date?.message}
                                wrapperClassName=""
                                {...field}
                                value={field.value ?? ''}
                            />
                        )}
                    />
                    <Controller
                        name="end_date"
                        control={control}
                        rules={{
                            required: 'End date is required',
                            validate: (value) => {
                                const start = getValues('start_date');
                                if (start && value && value < start) {
                                    return 'End date cannot be before start date';
                                }
                                return true;
                            },
                        }}
                        render={({ field }) => (
                            <FormInput
                                id="end_date"
                                type="date"
                                label="End Date"
                                error={errors.end_date?.message}
                                wrapperClassName=""
                                {...field}
                                value={field.value ?? ''}
                            />
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <FormSelect
                                id="priority"
                                label="Priority"
                                options={taskPriorityOptions}
                                wrapperClassName=""
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <FormSelect
                                id="status"
                                label="Status"
                                options={taskStatusOptions}
                                wrapperClassName=""
                                {...field}
                            />
                        )}
                    />
                </div>

                <FormButton type="submit" fullWidth>
                    Create Task
                </FormButton>
            </form>
        </div>
    );
}
