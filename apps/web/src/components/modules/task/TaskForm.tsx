'use client';

import { X } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import {
    FormInput,
    FormTextarea,
    FormSelect,
    FormButton,
} from '@/components/form';
import useGetProjects from '@/hooks/shared/useGetProjects';
import useGetSprints from '@/hooks/shared/useGetSprints';
import {
    taskPriorityOptions,
    taskStatusOptions,
} from '@/constants/taskStatusOptions';
import { supabase } from '@/lib/supabase/client';

export interface TaskFormValues {
    title: string;
    description: string;
    priority: string;
    status: string;
    due_date: string | null;
    sprint_id: string;
}

interface TaskFormProps {
    onSubmit: (data: TaskFormValues) => void;
    onCancel: () => void;
}

const defaultValues: TaskFormValues = {
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    due_date: '',
    sprint_id: '',
};

export default function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
    const { data: projectsData } = useGetProjects();

    const {
        control,
        handleSubmit: rhfSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<TaskFormValues & { project_id: string }>({
        defaultValues: { ...defaultValues, project_id: '' },
    });

    const projectId = watch('project_id');
    const { data: sprintsData } = useGetSprints(projectId || undefined, {
        enabled: !!projectId,
    });

    const projectOptions =
        projectsData?.map((p) => ({ value: p.id, label: p.name })) ?? [];
    const sprintOptions =
        sprintsData?.map((s) => ({ value: s.id, label: s.name })) ?? [];

    const onSubmitForm = async (
        data: TaskFormValues & { project_id: string },
    ) => {
        const { project_id: _, ...rest } = data;
        const payload = {
            ...rest,
            due_date: rest.due_date?.trim() ? rest.due_date : null,
        };
        try {
            const { error } = await supabase.from('tasks').insert(payload);
            if (error) {
                console.error(error);
                return;
            }
            onSubmit(payload);
            reset({ ...defaultValues, project_id: '' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                    Create New Task
                </h2>
                <button
                    onClick={onCancel}
                    className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <X size={20} className="text-slate-500" />
                </button>
            </div>

            <form onSubmit={rhfSubmit(onSubmitForm)} className="space-y-5">
                <Controller
                    name="project_id"
                    control={control}
                    render={({ field }) => (
                        <FormSelect
                            id="project_id"
                            label="Project"
                            options={projectOptions}
                            placeholder="Select a project"
                            wrapperClassName=""
                            {...field}
                            onChange={(e) => {
                                field.onChange(e);
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

                <Controller
                    name="due_date"
                    control={control}
                    render={({ field }) => (
                        <FormInput
                            id="due_date"
                            type="date"
                            label="Due Date"
                            error={errors.due_date?.message}
                            wrapperClassName=""
                            {...field}
                            value={field.value ?? ''}
                        />
                    )}
                />

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
