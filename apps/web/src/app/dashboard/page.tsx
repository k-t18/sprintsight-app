'use client';
import React from 'react';
import { useGetUserProfile } from '@/hooks/shared/useGetUserProfile';
import DeveloperDashboard from '@/components/modules/dashboards/developer/Dashboard';
import LeadDashboard from '@/components/modules/dashboards/lead/Dashboard';
const Page = () => {
    const { profile, loading, error } = useGetUserProfile();
    console.log('profile', profile);
    if (loading) return <div className="min-h-screen bg-brand-base flex items-center justify-center text-brand-accent text-lg">Loading...</div>;
    if (error) return <div className="min-h-screen bg-brand-base flex items-center justify-center text-red-400 text-lg">Error: {error}</div>;
    return (
        <div>
            {profile?.role === 'developer' ? (
                <DeveloperDashboard />
            ) : (
                <LeadDashboard />
            )}
        </div>
    );
};

export default Page;
