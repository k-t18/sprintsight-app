'use client';

import { useState } from 'react';
import { Calendar, Users, X } from 'lucide-react';

interface ProjectFormProps {
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

const projectManagers = [
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Carol Davis' },
    { id: 4, name: 'David Wilson' },
    { id: 5, name: 'Emma Brown' },
];

const statuses = [
    'Planning',
    'In Progress',
    'On Hold',
    'Completed',
    'Cancelled',
];

export default function ProjectForm({ onSubmit, onCancel }: ProjectFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        manager: '',
        startDate: '',
        endDate: '',
        status: 'Planning',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Project name is required';
        }
        if (!formData.manager) {
            newErrors.manager = 'Project manager is required';
        }
        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }
        if (!formData.endDate) {
            newErrors.endDate = 'End date is required';
        }
        if (
            formData.startDate &&
            formData.endDate &&
            formData.startDate > formData.endDate
        ) {
            newErrors.endDate = 'End date must be after start date';
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
                description: '',
                manager: '',
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
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 border border-slate-200"
        >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Create New Project
            </h2>

            {/* Project Name */}
            <div className="mb-5">
                <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                >
                    Project Name
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter project name"
                    className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-all ${
                        errors.name
                            ? 'border-red-500 focus:border-red-600 focus:ring-red-500'
                            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                />
                {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                )}
            </div>

            {/* Description */}
            <div className="mb-5">
                <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add project description (optional)"
                    rows={3}
                    className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 transition-all resize-none"
                />
            </div>

            {/* Project Manager */}
            <div className="mb-5">
                <label
                    htmlFor="manager"
                    className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
                >
                    <Users size={16} />
                    Project Manager
                </label>
                <select
                    id="manager"
                    name="manager"
                    value={formData.manager}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-all ${
                        errors.manager
                            ? 'border-red-500 focus:border-red-600 focus:ring-red-500'
                            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                >
                    <option value="">Select a project manager</option>
                    {projectManagers.map((pm) => (
                        <option key={pm.id} value={pm.name}>
                            {pm.name}
                        </option>
                    ))}
                </select>
                {errors.manager && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.manager}
                    </p>
                )}
            </div>

            {/* Start Date */}
            <div className="mb-5">
                <label
                    htmlFor="startDate"
                    className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
                >
                    <Calendar size={16} />
                    Start Date
                </label>
                <input
                    id="startDate"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-all ${
                        errors.startDate
                            ? 'border-red-500 focus:border-red-600 focus:ring-red-500'
                            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                />
                {errors.startDate && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.startDate}
                    </p>
                )}
            </div>

            {/* End Date */}
            <div className="mb-5">
                <label
                    htmlFor="endDate"
                    className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"
                >
                    <Calendar size={16} />
                    End Date
                </label>
                <input
                    id="endDate"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-all ${
                        errors.endDate
                            ? 'border-red-500 focus:border-red-600 focus:ring-red-500'
                            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                />
                {errors.endDate && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.endDate}
                    </p>
                )}
            </div>

            {/* Status */}
            <div className="mb-6">
                <label
                    htmlFor="status"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                >
                    Status
                </label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-blue-500 transition-all"
                >
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3">
                <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    Create Project
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all"
                >
                    <X size={20} />
                </button>
            </div>
        </form>
    );
}
