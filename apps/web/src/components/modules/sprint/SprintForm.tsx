'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface SprintFormProps {
    projects: any[];
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

const STATUS_OPTIONS = ['Planning', 'Active', 'Completed', 'On Hold'];

export default function SprintForm({
    projects,
    onSubmit,
    onCancel,
}: SprintFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        projectId: '',
        goal: '',
        startDate: '',
        endDate: '',
        status: 'Planning',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Sprint name is required';
        }

        if (!formData.projectId) {
            newErrors.projectId = 'Please select a project';
        }

        if (!formData.goal.trim()) {
            newErrors.goal = 'Sprint goal is required';
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
                name: '',
                projectId: '',
                goal: '',
                startDate: '',
                endDate: '',
                status: 'Planning',
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
                    Create New Sprint
                </h2>
                <button
                    onClick={onCancel}
                    className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <X size={20} className="text-slate-500" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Sprint Name */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Sprint Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Sprint 1 - Authentication"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            errors.name
                                ? 'border-red-500 bg-red-50'
                                : 'border-slate-300'
                        }`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Project Select */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Project <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="projectId"
                        value={formData.projectId}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                            errors.projectId
                                ? 'border-red-500 bg-red-50'
                                : 'border-slate-300'
                        }`}
                    >
                        <option value="">Select a project</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                    {errors.projectId && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.projectId}
                        </p>
                    )}
                </div>

                {/* Goal */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Sprint Goal <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        placeholder="Describe the main objective of this sprint..."
                        rows={3}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
                            errors.goal
                                ? 'border-red-500 bg-red-50'
                                : 'border-slate-300'
                        }`}
                    />
                    {errors.goal && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.goal}
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

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    Create Sprint
                </button>
            </form>
        </div>
    );
}
