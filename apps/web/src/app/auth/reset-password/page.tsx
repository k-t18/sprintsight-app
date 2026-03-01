'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

const Page = () => {
    const router = useRouter();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleReset = async () => {
        setError('');
        setSuccess('');

        if (!password || !confirmPassword) {
            setError('Please fill in all the fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setError(
                error.message ||
                    'Unable to reset password. Your link may have expired, please request a new reset email.',
            );
            setLoading(false);
            return;
        }

        setSuccess('Password updated successfully. Redirecting to login…');
        setLoading(false);

        setTimeout(() => {
            router.push('/login');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-base px-4">
            <div className="w-full max-w-md rounded-2xl border border-brand-border bg-brand-surface shadow-xl backdrop-blur-md p-8 space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-brand-text">
                        Reset your password
                    </h1>
                    <p className="text-sm text-brand-textSecondary">
                        Choose a strong new password for your SprintSight account.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-brand-textSecondary">
                            New password
                        </label>
                        <input
                            type="password"
                            className="w-full rounded-md border border-brand-border bg-brand-base px-3 py-2 text-sm text-brand-text placeholder-brand-textMuted outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                            placeholder="Enter a new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-brand-textSecondary">
                            Confirm new password
                        </label>
                        <input
                            type="password"
                            className="w-full rounded-md border border-brand-border bg-brand-base px-3 py-2 text-sm text-brand-text placeholder-brand-textMuted outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
                            placeholder="Re-enter your new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>

                {error && (
                    <div className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">
                        {success}
                    </div>
                )}

                <button
                    type="button"
                    onClick={handleReset}
                    disabled={loading}
                    className={`w-full rounded-md bg-brand-accent px-4 py-2 text-sm font-medium text-brand-base transition-colors hover:bg-brand-accentHover focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-surface ${
                        loading ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                >
                    {loading ? 'Updating password…' : 'Update password'}
                </button>

                <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="w-full text-center text-sm text-brand-textSecondary hover:text-brand-text transition-colors"
                >
                    Back to login
                </button>
            </div>
        </div>
    );
};

export default Page;

