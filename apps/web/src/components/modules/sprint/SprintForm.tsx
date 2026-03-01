'use client';

import { X } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import {
    FormInput,
    FormTextarea,
    FormSelect,
    FormButton,
} from '@/components/form';
import { sprintStatusOptions } from '@/constants/sprintStatusOptions';
import useGetProjects from '@/hooks/shared/useGetProjects';
import { supabase } from '@/lib/supabase/client';

export interface SprintFormValues {
    name: string;
    project_id: string;
    start_date: string;
    end_date: string;
    status: string;
    goal: string;
}

interface SprintFormProps {
    onSubmit: (data: SprintFormValues) => void;
    onCancel: () => void;
}

const defaultValues: SprintFormValues = {
    name: '',
    project_id: '',
    start_date: '',
    end_date: '',
    status: 'planned',
    goal: '',
};

export default function SprintForm({ onSubmit, onCancel }: SprintFormProps) {
    const { data: projectsData } = useGetProjects();

    const {
        control,
        handleSubmit: rhfSubmit,
        reset,
        formState: { errors },
    } = useForm<SprintFormValues>({ defaultValues });

    const projectOptions =
        projectsData?.map((p) => ({ value: p.id, label: p.name })) ?? [];
    console.log('projectsData', projectsData);
    const onSubmitForm = async (data: SprintFormValues) => {
        try {
            const { error } = await supabase.from('sprints').insert([
                {
                    name: data.name,
                    project_id: data.project_id,
                    start_date: data.start_date,
                    end_date: data.end_date,
                    status: data.status,
                    goal: data.goal,
                },
            ]);

            if (error) {
                console.error(error);
                return;
            }
            onSubmit(data);
            reset(defaultValues);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-brand-surface rounded-xl p-6 border border-brand-border">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-brand-text">
                    Create New Sprint
                </h2>
                <button
                    onClick={onCancel}
                    className="p-1 hover:bg-brand-surfaceHover rounded-lg transition-colors"
                >
                    <X size={20} className="text-brand-textSecondary" />
                </button>
            </div>

            <form onSubmit={rhfSubmit(onSubmitForm)} className="space-y-5">
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Sprint name is required' }}
                    render={({ field }) => (
                        <FormInput
                            id="name"
                            label="Sprint Name"
                            placeholder="e.g., Sprint 1 - Authentication"
                            error={errors.name?.message}
                            wrapperClassName=""
                            {...field}
                        />
                    )}
                />

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
                        />
                    )}
                />

                <Controller
                    name="goal"
                    control={control}
                    rules={{ required: 'Sprint goal is required' }}
                    render={({ field }) => (
                        <FormTextarea
                            id="goal"
                            label="Sprint Goal"
                            placeholder="Describe the main objective of this sprint..."
                            rows={3}
                            error={errors.goal?.message}
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
                            />
                        )}
                    />
                    <Controller
                        name="end_date"
                        control={control}
                        rules={{
                            required: 'End date is required',
                            validate: (value, formValues) =>
                                formValues.start_date &&
                                value &&
                                value <= formValues.start_date
                                    ? 'End date must be after start date'
                                    : true,
                        }}
                        render={({ field }) => (
                            <FormInput
                                id="end_date"
                                type="date"
                                label="End Date"
                                error={errors.end_date?.message}
                                wrapperClassName=""
                                {...field}
                            />
                        )}
                    />
                </div>

                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <FormSelect
                            id="status"
                            label="Status"
                            options={sprintStatusOptions}
                            placeholder="Select a status"
                            wrapperClassName=""
                            {...field}
                        />
                    )}
                />

                <FormButton type="submit" fullWidth>
                    Create Sprint
                </FormButton>
            </form>
        </div>
    );
}
