'use client';

import React from 'react';

export type FilterTabOption = { id: string; label: string };

type FilterTabsProps = {
    options: FilterTabOption[];
    selectedId: string | null;
    onSelect: (id: string | null) => void;
    className?: string;
};

export default function FilterTabs({
    options,
    selectedId,
    onSelect,
    className = '',
}: FilterTabsProps) {
    return (
        <div
            className={`flex flex-wrap gap-2 ${className}`}
            role="tablist"
            aria-label="Filter options"
        >
            {options.map((opt) => {
                const isSelected = selectedId === opt.id;
                return (
                    <button
                        key={opt.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => onSelect(opt.id)}
                        className={
                            isSelected
                                ? 'rounded-lg px-4 py-2 text-sm font-medium bg-brand-surface text-brand-text border border-brand-border'
                                : 'rounded-lg px-4 py-2 text-sm font-medium bg-transparent text-brand-textSecondary border border-brand-border hover:bg-brand-surface/50 transition-colors'
                        }
                    >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}
