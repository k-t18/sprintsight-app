'use client';

import { Calendar, Users } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { supabase } from '@/lib/supabase/client';
import {
    FormInput,
    FormTextarea,
    FormSelect,
    FormButton,
} from '@/components/form';
import useGetStakeHolders from '@/hooks/shared/useGetStakeHolders';
import { projectStatusOptions } from '@/constants/projectStatusOptions';
import useGetAllUsers from '@/hooks/shared/useGetAllUsers';

export interface ProjectFormValues {
    name: string;
    description: string;
    status: string;
    start_date: string;
    end_date: string;
    owner_person_id: string;
    selected_user_id: string;
}

interface ProjectFormProps {
    onSubmit: (data: ProjectFormValues) => void;
    onCancel: () => void;
}

const defaultValues: ProjectFormValues = {
    name: '',
    description: '',
    status: 'planning',
    start_date: '',
    end_date: '',
    owner_person_id: '',
    selected_user_id: '',
};

export default function ProjectForm({ onSubmit, onCancel }: ProjectFormProps) {
    const { data: stakeHolders } = useGetStakeHolders();
    const { data: allUsers } = useGetAllUsers();

    const {
        control,
        handleSubmit: rhfSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm<ProjectFormValues>({
        defaultValues,
    });

    const onSubmitForm = async (data: ProjectFormValues) => {
        const { data: inserted, error: projectError } = await supabase
            .from('projects')
            .insert([
                {
                    name: data.name,
                    description: data.description,
                    status: data.status,
                    start_date: data.start_date,
                    end_date: data.end_date,
                    owner_person_id: data.owner_person_id || null,
                },
            ])
            .select('id')
            .single();

        if (projectError || !inserted) {
            setError('root', {
                message: 'Failed to create project. Please try again.',
            });
            return;
        }

        if (data.selected_user_id) {
            const { error: memberError } = await supabase
                .from('project_members')
                .insert([
                    {
                        project_id: inserted.id,
                        profile_id: data.selected_user_id,
                    },
                ]);
            if (memberError) {
                setError('root', {
                    message:
                        'Project created but failed to add member. Please try again.',
                });
                return;
            }
        }

        onSubmit(data);
        reset(defaultValues);
    };

    const pmOptions = stakeHolders
        .filter((sh) => sh.role === 'pm')
        .map((sh) => ({ value: sh.id, label: sh.full_name }));

    const userOptions =
        allUsers
            ?.filter((u) => u.role === 'developer')
            .map((u) => ({ value: u.id, label: u.full_name ?? '' })) ?? [];

    return (
        <form
            onSubmit={rhfSubmit(onSubmitForm)}
            className="bg-white rounded-xl shadow-lg p-6 border border-slate-200"
        >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Create New Project
            </h2>

            <Controller
                name="name"
                control={control}
                rules={{ required: 'Project name is required' }}
                render={({ field }) => (
                    <FormInput
                        id="name"
                        label="Project Name"
                        placeholder="Enter project name"
                        error={errors.name?.message}
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
                        placeholder="Add project description (optional)"
                        rows={3}
                        {...field}
                    />
                )}
            />

            <Controller
                name="owner_person_id"
                control={control}
                rules={{ required: 'Project manager is required' }}
                render={({ field }) => (
                    <FormSelect
                        id="owner_person_id"
                        label="Project Manager"
                        options={pmOptions}
                        placeholder="Select a project manager"
                        error={errors.owner_person_id?.message}
                        icon={<Users size={16} />}
                        {...field}
                    />
                )}
            />

            <Controller
                name="selected_user_id"
                control={control}
                render={({ field }) => (
                    <FormSelect
                        id="selected_user_id"
                        label="User"
                        options={userOptions}
                        placeholder="Select a user"
                        error={errors.selected_user_id?.message}
                        icon={<Users size={16} />}
                        {...field}
                    />
                )}
            />

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
                        icon={<Calendar size={16} />}
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
                        icon={<Calendar size={16} />}
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
                        options={projectStatusOptions}
                        wrapperClassName="mb-6"
                        {...field}
                    />
                )}
            />

            {errors.root?.message && (
                <p className="text-red-500 text-sm mb-4">
                    {errors.root.message}
                </p>
            )}

            <div className="flex gap-3">
                <FormButton type="submit">Create Project</FormButton>
            </div>
        </form>
    );
}
