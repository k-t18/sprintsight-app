'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

type Step = 'email' | 'otp' | 'password';

const Page = () => {
    const router = useRouter();
    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSendOtp = async () => {
        setError('');
        if (!email.trim()) {
            setError('Enter your email');
            return;
        }
        setLoading(true);
        const { error: err } = await supabase.auth.signInWithOtp({
            email: email.trim(),
            options: { shouldCreateUser: false },
        });
        setLoading(false);
        if (err) {
            setError(err.message);
            return;
        }
        setSuccess('Check your email for the 6-digit code.');
        setStep('otp');
    };

    const handleVerifyOtp = async () => {
        setError('');
        if (!otp.trim() || otp.trim().length !== 6) {
            setError('Enter the 6-digit code from your email');
            return;
        }
        setLoading(true);
        const { error: err } = await supabase.auth.verifyOtp({
            email: email.trim(),
            token: otp.trim(),
            type: 'email',
        });
        setLoading(false);
        if (err) {
            setError(err.message);
            return;
        }
        setSuccess('');
        setStep('password');
    };

    const handleUpdatePassword = async () => {
        setError('');
        if (!password || !confirmPassword) {
            setError('Fill in both password fields');
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
        const { error: err } = await supabase.auth.updateUser({ password });
        setLoading(false);
        if (err) {
            setError(err.message);
            return;
        }
        setSuccess('Password updated. Redirecting to login…');
        setTimeout(() => router.push('/auth/login'), 1500);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 bg-brand-base">
            <h1 className="text-2xl font-bold text-brand-text">Forgot Password</h1>

            {step === 'email' && (
                <>
                    <p className="text-sm text-brand-textSecondary text-center max-w-sm">
                        Enter your email. We&apos;ll send a verification code to
                        reset your password.
                    </p>
                    <input
                        className="border border-brand-border rounded-md p-2 w-full max-w-xs bg-brand-surface text-brand-text placeholder:text-brand-textMuted focus:border-brand-accent focus:outline-none"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                    <button
                        className="bg-brand-accent text-brand-base rounded-md p-2 px-4 hover:bg-brand-accentHover transition-colors disabled:opacity-50 font-semibold"
                        onClick={handleSendOtp}
                        disabled={loading}
                    >
                        {loading ? 'Sending…' : 'Send verification code'}
                    </button>
                </>
            )}

            {step === 'otp' && (
                <>
                    <p className="text-sm text-brand-textSecondary text-center max-w-sm">
                        Enter the 6-digit code sent to {email}
                    </p>
                    <input
                        className="border border-brand-border rounded-md p-2 w-full max-w-xs bg-brand-surface text-brand-text text-center tracking-widest placeholder:text-brand-textMuted focus:border-brand-accent focus:outline-none"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="000000"
                        value={otp}
                        onChange={(e) =>
                            setOtp(e.target.value.replace(/\D/g, ''))
                        }
                        autoFocus
                    />
                    <button
                        className="bg-brand-accent text-brand-base rounded-md p-2 px-4 hover:bg-brand-accentHover transition-colors disabled:opacity-50 font-semibold"
                        onClick={handleVerifyOtp}
                        disabled={loading}
                    >
                        {loading ? 'Verifying…' : 'Verify code'}
                    </button>
                    <button
                        type="button"
                        className="text-sm text-brand-textSecondary hover:text-brand-accent"
                        onClick={() => {
                            setStep('email');
                            setOtp('');
                            setSuccess('');
                        }}
                    >
                        Use a different email
                    </button>
                </>
            )}

            {step === 'password' && (
                <>
                    <p className="text-sm text-brand-textSecondary text-center max-w-sm">
                        Set a new password for {email}
                    </p>
                    <input
                        className="border border-brand-border rounded-md p-2 w-full max-w-xs bg-brand-surface text-brand-text placeholder:text-brand-textMuted focus:border-brand-accent focus:outline-none"
                        type="password"
                        placeholder="New password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                    />
                    <input
                        className="border border-brand-border rounded-md p-2 w-full max-w-xs bg-brand-surface text-brand-text placeholder:text-brand-textMuted focus:border-brand-accent focus:outline-none"
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        className="bg-brand-accent text-brand-base rounded-md p-2 px-4 hover:bg-brand-accentHover transition-colors disabled:opacity-50 font-semibold"
                        onClick={handleUpdatePassword}
                        disabled={loading}
                    >
                        {loading ? 'Updating…' : 'Update password'}
                    </button>
                </>
            )}

            {error && (
                <div className="text-red-400 text-sm text-center max-w-xs">
                    {error}
                </div>
            )}
            {success && (
                <div className="text-emerald-400 text-sm text-center max-w-xs">
                    {success}
                </div>
            )}

            <a
                href="/auth/login"
                className="text-sm text-brand-accent hover:underline mt-2"
            >
                Back to login
            </a>
        </div>
    );
};

export default Page;
