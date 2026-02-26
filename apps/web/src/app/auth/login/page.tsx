'use client';
import { supabase } from '@/lib/supabase/client';
import React, { useState } from 'react';

const Page = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        if (username === '' || password === '') {
            setError('Please fill in all the fields');
            return;
        }
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });
        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">Login</h1>
            <input
                className="border border-primary-300 rounded-md p-2 text-black"
                type="text"
                placeholder="Username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="border border-primary-300 rounded-md p-2 text-black"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="text-red-500">{error}</div>}
            <button
                className={`bg-primary-500 text-white rounded-md p-2 hover:bg-primary-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Login'}
            </button>
        </div>
    );
};

export default Page;
