'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface TaskFormProps {
    sprints: any[];
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Critical'];
const STATUS_OPTIONS = ['To Do', 'In Progress', 'In Review', 'Done'];

export default function TaskForm({
    sprints,
    onSubmit,
    onCancel,
}: TaskFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        sprintId: '',
        description: '',
        startDate: '',
        endDate: '',
        priority: 'Medium',
        status: 'To Do',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Task title is required';
        }

        if (!formData.sprintId) {
            newErrors.sprintId = 'Please select a sprint';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Task description is required';
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }

        if (!formData.endDate) {
            newErrors.endDate = 'End date is required';
        }

        if (formData.startDate && formData.endDate) {
            if (new Date(formData.endDate) <= new Date(formData.startDate)) {
                newErrors.endDate = 'End date must be after start date';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData);
            setFormData({
                title: '',
                sprintId: '',
                description: '',
                startDate: '',
                endDate: '',
                priority: 'Medium',
                status: 'To Do',
            });
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
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

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Task Title */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Task Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Implement user authentication"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            errors.title
                                ? 'border-red-500 bg-red-50'
                                : 'border-slate-300'
                        }`}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.title}
                        </p>
                    )}
                </div>

                {/* Sprint Select */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Sprint <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="sprintId"
                        value={formData.sprintId}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            errors.sprintId
                                ? 'border-red-500 bg-red-50'
                                : 'border-slate-300'
                        }`}
                    >
                        <option value="">Select a sprint</option>
                        {sprints.map((sprint) => (
                            <option key={sprint.id} value={sprint.id}>
                                {sprint.name}
                            </option>
                        ))}
                    </select>
                    {errors.sprintId && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.sprintId}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the task in detail..."
                        rows={3}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
                            errors.description
                                ? 'border-red-500 bg-red-50'
                                : 'border-slate-300'
                        }`}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.description}
                        </p>
                    )}
                </div>

                {/* Dates Row */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Start Date */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Start Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                errors.startDate
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-slate-300'
                            }`}
                        />
                        {errors.startDate && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.startDate}
                            </p>
                        )}
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            End Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                errors.endDate
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-slate-300'
                            }`}
                        />
                        {errors.endDate && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.endDate}
                            </p>
                        )}
                    </div>
                </div>

                {/* Priority and Status Row */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Priority */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Priority
                        </label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            {PRIORITY_OPTIONS.map((priority) => (
                                <option key={priority} value={priority}>
                                    {priority}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            {STATUS_OPTIONS.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    Create Task
                </button>
            </form>
        </div>
    );
}
