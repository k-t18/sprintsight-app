'use client';
import React from 'react';
import { useGetUserProfile } from '@/hooks/shared/useGetUserProfile';
import DeveloperDashboard from '@/components/modules/dashboards/developer/Dashboard';
import LeadDashboard from '@/components/modules/dashboards/lead/Dashboard';
const Page = () => {
    const { profile, loading, error } = useGetUserProfile();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
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
