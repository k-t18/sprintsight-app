'use client';

import React from 'react';
import { X } from 'lucide-react';

interface FormDrawerProps {
    open: boolean;
    title?: string;
    onClose: () => void;
    children: React.ReactNode;
}

const FormDrawer: React.FC<FormDrawerProps> = ({
    open,
    title,
    onClose,
    children,
}) => {
    return (
        <div
            className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
                open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
            <button
                type="button"
                aria-label="Close drawer"
                className={`flex-1 bg-black/40 transition-opacity duration-300 ${
                    open ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={onClose}
            />
            <div
                className={`w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col transform transition-transform duration-300 ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                    {title ? (
                        <h2 className="text-lg font-semibold text-slate-900">
                            {title}
                        </h2>
                    ) : (
                        <span />
                    )}
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    >
                        <X size={18} className="text-slate-500" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">{children}</div>
            </div>
        </div>
    );
};

export default FormDrawer;

