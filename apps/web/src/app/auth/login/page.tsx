'use client';

import { supabase } from '@/lib/supabase/client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Page = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleLogin = async () => {
        if (username === '' || password === '') {
            setError('Please fill in all the fields');
            return;
        }
        setError('');
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });
        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }
        setLoading(false);
        router.replace('/');
    };

    return (
        <div className="flex min-h-screen bg-brand-base">
            {/* Left Panel - Code Showcase */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-brand-border">
                <div>
                    <div className="inline-block mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-brand-accent rounded-full" />
                            <span className="text-brand-text font-bold text-xl">
                                SprintSight
                            </span>
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold text-brand-text mb-6 leading-tight">
                        Build Projects,
                        <br />
                        Manage Sprints,
                        <br />
                        <span className="bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text text-transparent">
                            Ship Tasks
                        </span>
                    </h1>
                    <p className="text-brand-textSecondary text-lg max-w-md">
                        Developer-first project management for teams that move
                        fast and deploy faster.
                    </p>
                </div>

                {/* Code Block */}
                <div className="bg-brand-surface border border-brand-border rounded-lg p-6 overflow-hidden">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-brand-border">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-brand-accentMuted" />
                            <div className="w-3 h-3 rounded-full bg-brand-accentMuted" />
                            <div className="w-3 h-3 rounded-full bg-brand-accentMuted" />
                        </div>
                        <span className="text-xs text-brand-textMuted ml-2 font-mono">
                            sprint-management.ts
                        </span>
                    </div>
                    <pre className="text-xs text-brand-textSecondary font-mono overflow-x-auto">
                        <code>{`// Create a new sprint
const sprint = await api.sprints.create({
  name: "Q1 Release",
  projectId: "proj_123",
  goal: "Ship new features",
  startDate: new Date(),
  endDate: new Date(),
  status: "active"
});

// Link tasks to sprint
await sprint.linkTasks([
  task1.id,
  task2.id,
  task3.id
]);`}</code>
                    </pre>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-brand-border">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-accent to-cyan-400 rounded-lg" />
                    <div>
                        <p className="text-brand-text font-medium text-sm">
                            v1.0.0
                        </p>
                        <p className="text-brand-textMuted text-xs">
                            Latest Release
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex flex-1 items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-brand-text">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-brand-textSecondary">
                            Sign in to your account to continue
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-brand-text mb-2"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted"
                                />
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="developer@company.com"
                                    value={username}
                                    autoFocus
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-3 bg-brand-surface border border-brand-border rounded-lg text-brand-text placeholder:text-brand-textMuted focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-brand-text"
                                >
                                    Password
                                </label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm text-brand-accent hover:text-brand-accentHover"
                                >
                                    Forgot?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted"
                                />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full pl-10 pr-12 py-3 bg-brand-surface border border-brand-border rounded-lg text-brand-text placeholder:text-brand-textMuted focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-textMuted hover:text-brand-text"
                                    aria-label={
                                        showPassword
                                            ? 'Hide password'
                                            : 'Show password'
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-400">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-brand-accent hover:bg-brand-accentHover text-brand-base font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in…' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-brand-textSecondary text-sm">
                        Don&apos;t have an account?{' '}
                        <span className="text-brand-accent hover:text-brand-accentHover">
                            Slack your Lead to get an account
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;
